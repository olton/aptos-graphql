import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const create_account = /* GraphQL */ `
    mutation {
        createAccount{
            address
            publicKey
            authKey
            privateKey
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, create_account)

logObject(response)