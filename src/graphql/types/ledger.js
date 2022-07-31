export const LedgerType =  /* GraphQL */`
        type LedgerState {
        chain_id: String!
        epoch: String!
        ledger_version: String!
        oldest_ledger_version: String
        ledger_timestamp: String!
        node_role: String!
        message: String
    }

    type Ledger {
        node: String
        state: LedgerState
    }
`
