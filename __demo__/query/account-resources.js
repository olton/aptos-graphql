import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

let query, response

query = /* GraphQL */ `
    query MyQuery {
        account(
            addr: "0x310dfd70948d6b22c5e6a573719e21f0437d4fa4986a106e439a1f9d44dcae0c"
        ) {
            resources {
                data
                typename
            }
        }
    }`

response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query)

logObject(response)

query = /* GraphQL */ `
    query MyQuery {
        account(
            addr: "0x310dfd70948d6b22c5e6a573719e21f0437d4fa4986a106e439a1f9d44dcae0c"
        ) {
            resource(res: "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>") {
                data
                typename
            }
        }
    }
`

response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query)

logObject(response)
