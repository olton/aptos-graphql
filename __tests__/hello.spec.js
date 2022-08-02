import fetchGraphQL from "../src/graphql/fetcher/fetcher.js";
import {GRAPHQL_ENDPOINT} from "../src/graphql/fetcher/fetcher.js";

const query = /* GraphQL */`
    query{
        hello
    }
`

describe("GraphQL Hello Word", () => {
    it("hello()", async () => {
        const hello = await fetchGraphQL(GRAPHQL_ENDPOINT, query)
        expect(hello.data.hello).toBe(`Hello from Aptos GraphQL Server!`)
    })
})
