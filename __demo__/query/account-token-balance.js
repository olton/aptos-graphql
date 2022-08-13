import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const query = /* GraphQL */ `
    query tokenBalance {
        account(
            addr: "0x310dfd70948d6b22c5e6a573719e21f0437d4fa4986a106e439a1f9d44dcae0c"
        ) {
            tokenBalance(collection: "Collection2", name: "Token2") {
                props
                name
                creator
                collection
                amount
            }
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query)

logObject(response)

