import {hello} from "./components/hello.js";
import {health} from "./components/health.js";
import {ledger} from "./components/ledger.js";
import {transactionsCount, transaction} from "./components/transactions.js";
import {balance} from "./components/balance.js";
import GraphQLJSON, {GraphQLJSONObject} from "graphql-type-json";
import {faucet} from "./components/faucet.js";
import {createAccount, account} from "./components/account.js";
import {sendCoins} from "./components/coins.js";
import {version} from "./components/version.js";
import {resources, resource, modules, module} from "./components/account.js";
import {events as eventsByHandle, minting, sentTransactions, receivedTransactions, transactions as accountTransactions, proposal, rounds} from "./components/account.js";
import {events} from "./components/events.js";
import {transactions} from "./components/transactions.js";
import {tableItem} from "./components/tables.js";
import {collections, createCollection, createToken, tokenData, tokenBalance} from "./components/nft.js";

const Query = {
    hello,
    health,
    ledger,
    account,
    transactionsCount,
    transaction,
    transactions,
    events,
    tableItem,
    tokenBalance,
    tokenData
}

const Mutation = {
    faucet,
    createAccount,
    sendCoins,
    createCollection,
    createToken
}

const Account = {
    balance,
    minting,
    sentTransactions,
    receivedTransactions,
    transactions: accountTransactions,
    proposal,
    rounds,
    resources,
    resource,
    modules,
    module,
    events: eventsByHandle,
    collections
}

const Subscription = {
    version
}

const Json = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
}

export const resolvers = {Query, Account, Mutation, Subscription, ...Json}