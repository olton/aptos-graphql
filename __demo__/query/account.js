import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const query1 = /* GraphQL */ `
    query {
        account(pk: "772049f3272f8e293359893969a936ddf232e2612fed5ffece089bd75414d71f"){
            address
            authentication_key
            sequence_number
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query1)

logObject(response)

// When kes was rotated
const query2 = /* GraphQL */ `
    query {
        account(
            pk: "772049f3272f8e293359893969a936ddf232e2612fed5ffece089bd75414d71f",
            addr: "0x310dfd70948d6b22c5e6a573719e21f0437d4fa4986a106e439a1f9d44dcae0c"
        ){
            address
            authentication_key
            sequence_number
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, query2)

logObject(response)