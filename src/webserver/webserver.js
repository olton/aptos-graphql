import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import express from "express"
import {createServer } from "@graphql-yoga/node";
import {info} from "../helpers/logging.js";
import {schema} from "../graphql/schema.js";
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

const app = express()

const route = () => {

}

export const runWebServer = () => {
    const {host, port, ssl} = config.graphql
    const {cert, key} = ssl
    const useSSL = ssl && (cert && key)
    let httpWebserver, httpsWebserver

    if (useSSL) {
        httpsWebserver = https.createServer({
            key: fs.readFileSync(key[0] === "." ? path.resolve(rootPath, key) : key),
            cert: fs.readFileSync(cert[0] === "." ? path.resolve(rootPath, cert) : cert)
        }, app)
    } else {
        httpWebserver = http.createServer({}, app)
    }

    route()

    const runInfo = `Aptos GraphQL Server running on ${useSSL ? "HTTPS" : "HTTP"} on port ${port}`

    if (useSSL) {
        httpsWebserver.listen(port, () => {
            info(runInfo)
        })
    } else {
        httpWebserver.listen(port, () => {
            info(runInfo)
        })
    }

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.locals.pretty = true
    const yoga = createServer({
        schema,
        graphiql: {
            subscriptionsProtocol: 'WS',
        },
    })

    app.use('/graphql', yoga);

    const wsServer = new WebSocketServer({
        server: useSSL ? httpsWebserver : httpWebserver,
        path: yoga.getAddressInfo().endpoint,
    })

    useServer(
        {
            execute: (args) => args.rootValue.execute(args),
            subscribe: (args) => args.rootValue.subscribe(args),
            onSubscribe: async (ctx, msg) => {
                const { schema, execute, subscribe, contextFactory, parse, validate } =
                    yoga.getEnveloped(ctx)

                const args = {
                    schema,
                    operationName: msg.payload.operationName,
                    document: parse(msg.payload.query),
                    variableValues: msg.payload.variables,
                    contextValue: await contextFactory(),
                    rootValue: {
                        execute,
                        subscribe,
                    },
                }

                const errors = validate(args.schema, args.document)
                if (errors.length) return errors
                return args
            },
        },
        wsServer,
    )
}
