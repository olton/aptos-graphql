import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import express from "express";
import session from "express-session"
import {info} from "../helpers/logging.js";
import {graphqlHTTP} from "express-graphql";
import {schema} from "../graphql/schema.js";
import {root} from "../graphql/root.js";

const app = express()

const route = () => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: 'Russian warship - Fuck You!',
        cookie: {
            maxAge: 24 * 3600000,
            secure: 'auto'
        }
    }))

    app.locals.pretty = true

    app.get('/', async (req, res) => {
    })

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }))
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
