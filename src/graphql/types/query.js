export const QueryType = /* GraphQL */ `
    type Query {
        hello: String
        health(node: [String]): [NodeHealth]
        ledger(node: [String]): [Ledger]
    }
`