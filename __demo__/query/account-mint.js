import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const query = /* GraphQL */ `
    query mintAddress {
        account(addr: "0x780c1d3d602d7bfe22b2a6c27d77a8f1e6d61c23a123f857b6f64cad9318bf71"){
            minting{
                hash
                mint
                receiver
                sender
                func
                timestamp
            }
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query)

logObject(response)