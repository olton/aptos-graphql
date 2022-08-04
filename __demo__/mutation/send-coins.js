import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../../src/graphql/fetcher/fetcher.js";
import {logObject} from "../../src/helpers/logging.js";

const send_coins = /* GraphQL */ `
    mutation ($pk: String!, $rs: String!, $am: String!){
        sendCoins(
            privateKey: $pk
            receiver: $rs
            amount: $am
        ) {
            coin
            balance
            amount
            gas{
                gas_used
                unit_price
                max_gas
            }
        }
    }
`

const response = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, send_coins, {
    "pk": "772049f3272f8e293359893969a936ddf232e2612fed5ffece089bd75414d71f",
    "rs": "0xa78b01313238552b68a24329f2f7b01c9cfb3fbbab5da185cb323192058f31a8",
    "am": "100"
})

logObject(response)