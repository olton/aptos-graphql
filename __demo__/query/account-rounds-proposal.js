import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const query = /* GraphQL */ `
    query {
        account(addr: "0x310dfd70948d6b22c5e6a573719e21f0437d4fa4986a106e439a1f9d44dcae0c"){
            rounds{
                epoch
                rounds
            }
            proposal{
                type
                version
                hash
                success
                vm_status
                timestamp
                id
                round
                epoch
                detail
            }
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query)

logObject(response)