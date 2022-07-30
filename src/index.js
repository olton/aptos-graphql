import path from "path"
import { fileURLToPath } from 'url'
import fs from "fs"
import {info, error} from "./helpers/logging.js"
import {runWebServer} from "./components/webserver.js";
import {broadcast} from "./components/websocket.js";
import {createDBConnection} from "./components/postgres.js";
import {Aptos} from "@olton/aptos-api";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf-8'))

globalThis.rootPath = path.dirname(__dirname)
globalThis.serverPath = __dirname
globalThis.srcPath = rootPath + "/src"
globalThis.pkg = readJson(""+path.resolve(rootPath, "package.json"))
globalThis.config = readJson(""+path.resolve(serverPath, "config.json"))
globalThis.appVersion = pkg.version
globalThis.appName = `Aptos GraphQL v${pkg.version}`
globalThis.aptos = new Aptos(config.aptos.api)

const runProcesses = () => {
}

export const run = (configPath) => {
    info("Starting Server...")

    try {

        globalThis.ssl = config.graphql.ssl && (config.graphql.ssl.certificate && config.graphql.ssl.key)
        globalThis.cache = new Proxy({
        }, {
            set(target, p, value, receiver) {
                target[p] = value
                return true
            }
        })

        globalThis.everyone = new Proxy({
        }, {
            set(target, p, value, receiver) {
                target[p] = value

                broadcast({
                    channel: p,
                    data: value
                })

                return true
            }
        })

        createDBConnection()
        runProcesses()
        runWebServer()

        info("Welcome to Aptos GraphQL Server!")
    } catch (e) {
        error(e)
        error(e.stack)
        process.exit(1)
    }
}

run()