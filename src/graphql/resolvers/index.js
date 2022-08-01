import {hello} from "./hello.js";
import {health} from "./health.js";
import {ledger} from "./ledger.js";
import {address} from "./address.js";
import {transactionsCount, transaction} from "./transactions.js";
import {balance} from "./balance.js";
import GraphQLJSON, {GraphQLJSONObject} from "graphql-type-json";

const Query = {
    hello,
    health,
    ledger,
    address,
    transactionsCount,
    transaction
}

const Address = {
    balance
}

const Json = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
}

export const resolvers = {Query, Address, ...Json}