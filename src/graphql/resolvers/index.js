import {hello} from "./components/hello.js";
import {health} from "./components/health.js";
import {ledger} from "./components/ledger.js";
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
import {version} from "./components/version.js";
import {resources, resource, modules, module} from "./components/account.js";
import {events as eventsByHandle} from "./components/account.js";
import {events} from "./components/events.js";

const Query = {
    hello,
    health,
    ledger,
    account,
    transactionsCount,
    transaction,
    events
}

const Mutation = {
    faucet,
    createAccount,
    sendCoins
}

const Account = {
    balance,
    minting,
    sentTransactions,
    receivedTransactions,
    transactions,
    proposal,
    rounds,
    resources,
    resource,
    modules,
    module,
    events: eventsByHandle
}

const Subscription = {
    version
}

const Json = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
}

export const resolvers = {Query, Account, Mutation, Subscription, ...Json}