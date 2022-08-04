import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const query = /* GraphQL */ `
    query {
        transaction(hash: "0xb8885126369e72e9b33d3bbb2600df592ea44b372473b7cf725602101f0bbbd4"){
            type
            version
            hash
            success
            vm_status
            gas_used
            timestamp
            detail
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query)

logObject(response)