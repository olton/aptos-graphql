import path from "path"
import { fileURLToPath } from 'url'
import fs from "fs"
import {info, error} from "./helpers/logging.js"
import {runWebServer} from "./webserver/webserver.js";
import {Aptos} from "@olton/aptos-api";
import Archive from "@olton/aptos-archive-api";
import {saveLedgerState} from "./graphql/resolvers/components/ledger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf-8'))

globalThis.rootPath = path.dirname(__dirname)
globalThis.serverPath = __dirname
globalThis.srcPath = rootPath + "/src"
globalThis.graphqlPath = srcPath + "/graphql"
globalThis.pkg = readJson(""+path.resolve(rootPath, "package.json"))
globalThis.config = readJson(""+path.resolve(serverPath, "graphql.conf"))
globalThis.appVersion = pkg.version
globalThis.appName = `Aptos GraphQL v${pkg.version}`
globalThis.indexer = null
globalThis.aptos = null
globalThis.ledger = {
    chain_id: 0,
    epoch: 0,
    ledger_version: 0,
    oldest_ledger_version: 0,
    ledger_timestamp: 0,
    node_role: "unknown"
}

const runProcesses = () => {
    setImmediate(saveLedgerState)
}

const createAptosConnection = () => {
    globalThis.aptos = new Aptos(config.aptos.api)
    info(`Aptos GraphQL Server connected to Aptos Node!`)
}

const createArchiveAPIConnection = () => {
    globalThis.arch = new Archive(config.archive)
    info(`Aptos GraphQL Server connected to Archive!`)
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

        createArchiveAPIConnection()
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