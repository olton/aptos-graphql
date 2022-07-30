import {hello} from "./resolvers/hello.js";
import {health} from "./resolvers/health.js";
import {ledger} from "./resolvers/ledger.js";

export const schema = {
    typeDefs: /* GraphQL */ `
        type NodeHealth {
            node: String!
            status: String!
        }

        type LedgerState {
            chain_id: String!
            epoch: String!
            ledger_version: String!
            oldest_ledger_version: String
            ledger_timestamp: String!
            node_role: String!
            message: String
        }

        type Ledger {
            node: String!
            state: LedgerState
        }

        type Query {
            hello: String
            health(node: String): NodeHealth
            ledger(node: String): Ledger
        }
    `,
    resolvers: {
        Query: {
            hello: () => hello(),
            health: (_, _args, context) => health(context.node),
            ledger: (_, _args, context) => ledger(context.node),
        }
    }
}
