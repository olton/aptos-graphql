import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import express from "express"
import {createServer} from "@graphql-yoga/node";
import {info} from "../helpers/logging.js";
import {schema} from "../graphql/schema.js";

const app = express()

const route = () => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.locals.pretty = true

    const yoga = createServer({
        schema,
        graphiql: true,
    })

    app.use('/graphql', yoga);
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

    //websocket(ssl ? httpsWebserver : httpWebserver)
}
