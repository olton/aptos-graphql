import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

let query, response

query = /* GraphQL */ `
    query MyQuery {
        account(addr: "0x1") {
            modules {
                abi
                bytecode
            }
        }
    }
`

response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query)

logObject(response)

query = /* GraphQL */ `
    query MyQuery {
        account(
            addr: "0x1"
        ) {
            module(mod: "consensus_config") {
                abi
                bytecode
            }
        }
    }
`

response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query)

logObject(response)
