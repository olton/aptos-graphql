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

export const runWebServer = () => {
    const {host, port} = config.graphql
    let httpWebserver

    httpWebserver = http.createServer({}, app)

    const runInfo = `Aptos GraphQL Server running on http://${host}:${port}/graphql`

    httpWebserver.listen(port, () => {
        info(runInfo)
    })

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
        server: httpWebserver,
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
