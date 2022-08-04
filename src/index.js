import path from "path"
import { fileURLToPath } from 'url'
import fs from "fs"
import {info, error} from "./helpers/logging.js"
import {runWebServer} from "./webserver/webserver.js";
import {Indexer} from "@olton/aptos-indexer-api";
import {Aptos} from "@olton/aptos-api";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf-8'))

globalThis.rootPath = path.dirname(__dirname)
globalThis.serverPath = __dirname
globalThis.srcPath = rootPath + "/src"
globalThis.graphqlPath = srcPath + "/graphql"
globalThis.pkg = readJson(""+path.resolve(rootPath, "package.json"))
globalThis.config = readJson(""+path.resolve(serverPath, "config.json"))
globalThis.appVersion = pkg.version
globalThis.appName = `Aptos GraphQL v${pkg.version}`
globalThis.indexer = null
globalThis.aptos = null
globalThis.epoch = -1

const runProcesses = () => {
    info(`Aptos GraphQL Server Background processes started!`)
}

const createAptosConnection = () => {
    const node = config.aptos.api
    globalThis.aptos = new Aptos(node)
    info(`Aptos GraphQL Server connected to default Aptos Node ${node}!`)
}

const createIndexerConnection = () => {
    const {proto, host, port, user, password, database} = config.indexer
    globalThis.indexer = new Indexer({
        proto,
        host,
        port,
        user,
        password,
        database
    })
    info(`Aptos GraphQL Server connected to Indexer on the ${host}!`)
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

        createIndexerConnection()
        createAptosConnection()
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