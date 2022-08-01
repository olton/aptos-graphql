import {hello} from "./hello.js";
import {health} from "./health.js";
import {ledger} from "./ledger.js";
import {address} from "./address.js";
import {transactionsCount, transaction} from "./transactions.js";
import {balance} from "./balance.js";

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

export const resolvers = {Query, Address}