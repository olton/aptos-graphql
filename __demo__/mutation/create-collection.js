import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const create_collection = /* GraphQL */ `
    mutation {
        createCollection (pk: "123.890", name: "Collection1", desc: "Collection 1", uri: "http://localhost", max: 100){
            type
            version
            hash
            success
            vm_status
            sender
            gas_used
            timestamp
            detail
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, create_collection)

logObject(response)