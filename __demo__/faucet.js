import fetchGraphQL, {GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_LOCAL} from "../src/graphql/fetcher/fetcher.js";
import {debug} from "../src/helpers/logging.js";

const mutation = /* GraphQL */ `
    mutation faucet ($addr: String!, $amount: Int!) {
        faucet(addr: $addr, amount: $amount){
            coin
            balance
        }
    }
`

const faucet = await fetchGraphQL(GRAPHQL_ENDPOINT_LOCAL, mutation, {
    addr: "0x310dfd70948d6b22c5e6a573719e21f0437d4fa4986a106e439a1f9d44dcae0c",
    amount: 111
})

debug(faucet)