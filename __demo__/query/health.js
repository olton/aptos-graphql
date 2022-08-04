import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const health = /* GraphQL */ `
    query {
        health(nodes: [
            "https://fullnode.aptos-node.net",
            "https://fullnode.devnet.aptoslabs.com",
        ]) {
            node
            status
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, health)

logObject(response)