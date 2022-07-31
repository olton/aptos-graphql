import {HelloResolver} from "./resolvers/hello.js";
import {HealthResolver} from "./resolvers/health.js";
import {LedgerResolver} from "./resolvers/ledger.js";
import {LedgerType} from "./types/ledger.js";
import {HealthType} from "./types/health.js";
import {QueryType} from "./types/query.js";

const typeDefs = [
    HealthType,
    LedgerType,
    QueryType
]

const resolvers = [
    HelloResolver,
    HealthResolver,
    LedgerResolver
]

export const schema = {
    typeDefs,
    resolvers,
}
