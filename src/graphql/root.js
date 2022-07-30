import {hello} from "./resolvers/hello.js";
import {health} from "./resolvers/health.js";
import {ledger} from "./resolvers/ledger.js";

export const root = {
    hello: () => hello(),
    health: ({node}) => health(node),
    ledger: ({node}) => ledger(node),
}