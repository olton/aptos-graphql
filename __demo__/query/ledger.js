import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const health = /* GraphQL */ `
    query {
        ledger(nodes: [
            "https://fullnode.aptos-node.net",
            "https://fullnode.devnet.aptoslabs.com"
        ]) {
            node
            state {
                chain_id
                epoch
                ledger_version
                ledger_timestamp
                node_role
                oldest_ledger_version
                message
            }
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, health)

logObject(response)