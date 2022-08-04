import {hello} from "./components/hello.js";
import {health} from "./components/health.js";
import {ledger} from "./components/ledger.js";
import {address} from "./components/address.js";
import {transactionsCount, transaction} from "./components/transactions.js";
import {balance} from "./components/balance.js";
import GraphQLJSON, {GraphQLJSONObject} from "graphql-type-json";
import {faucet} from "./components/faucet.js";
import {minting} from "./components/transactions.js";
import {sentTransactions} from "./components/transactions.js";
import {receivedTransactions} from "./components/transactions.js";
import {transactions} from "./components/transactions.js";
import {proposal} from "./components/transactions.js";
import {rounds} from "./components/transactions.js";
import {createAccount, account} from "./components/account.js";
import {sendCoins} from "./components/coins.js";

const Query = {
    hello,
    health,
    ledger,
    address,
    account,
    transactionsCount,
    transaction,
}

const Mutation = {
    faucet,
    createAccount,
    sendCoins
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