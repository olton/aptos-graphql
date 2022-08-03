import {hello} from "./hello.js";
import {health} from "./health.js";
import {ledger} from "./ledger.js";
import {address} from "./address.js";
import {transactionsCount, transaction} from "./transactions.js";
import {balance} from "./balance.js";
import GraphQLJSON, {GraphQLJSONObject} from "graphql-type-json";
import {faucet} from "./faucet.js";
import {minting} from "./transactions.js";
import {sentTransactions} from "./transactions.js";
import {receivedTransactions} from "./transactions.js";
import {transactions} from "./transactions.js";
import {proposal} from "./transactions.js";
import {rounds} from "./transactions.js";
import {createAccount} from "./account.js";

const Query = {
    hello,
    health,
    ledger,
    address,
    transactionsCount,
    transaction,
}

const Mutation = {
    faucet,
    createAccount,
}

const Address = {
    balance,
    minting,
    sentTransactions,
    receivedTransactions,
    transactions,
    proposal,
    rounds
}

const Json = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
}

export const resolvers = {Query, Address, Mutation, ...Json}