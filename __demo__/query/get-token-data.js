import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const query = /* GraphQL */ `
    query MyQuery {
        tokenData(
            collection: "Collection2"
            creator: "0x310dfd70948d6b22c5e6a573719e21f0437d4fa4986a106e439a1f9d44dcae0c"
            name: "Token2"
            owner: "0x310dfd70948d6b22c5e6a573719e21f0437d4fa4986a106e439a1f9d44dcae0c"
        ) {
            supply
            royalty
            name
            mutability_config
            maximum
            desc
            default_props
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query)

logObject(response)