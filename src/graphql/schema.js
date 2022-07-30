import {buildSchema} from "graphql";

export const schema = buildSchema(`
  type NodeHealth {
    node: String!
    status: String!
  }
  
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
    node: String!
    state: LedgerState 
  }
  
  type Query {
    hello: String
    health(node: String): NodeHealth
    ledger(node: String): Ledger
  }
`);
