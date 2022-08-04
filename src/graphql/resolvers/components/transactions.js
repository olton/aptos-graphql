import {GraphQLYogaError} from "@graphql-yoga/node";

const USER_TRANS = 'user_transaction'
const META_TRANS = 'block_metadata_transaction'
const GENESIS_TRANS = 'genesis_transaction'
const STATE_TRANS = 'state_checkpoint_transaction'

export const transactionsCount = async () => {
    const rows = await indexer.transCount()
    let success = 0, failed = 0, unknown = 0,
        state_checkpoint_transaction = 0, block_metadata_transaction = 0,
        user_transaction = 0, genesis_transaction = 0

    const result = {
        success: "0",
        failed: "0",
        unknown: "0",
        state_checkpoint_transaction: "0",
        block_metadata_transaction: "0",
        user_transaction: "0",
        genesis_transaction: "0",
    }

    if (!rows.ok) {
        throw new GraphQLYogaError(rows.message)
    }

    for(let r of rows.payload) {
        result[r.type] = r.counter
    }

    return result
}

export const transaction = async (_, {hash: tr_hash}) => {
    if (!tr_hash) throw new GraphQLYogaError(`Transaction hash not defined!`)

    const response = await aptos.getTransaction(tr_hash)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    const {type, version, hash, success, vm_status, gas_used, timestamp} = response.payload

    return {
        type,
        version,
        hash,
        success,
        vm_status,
        gas_used,
        timestamp,
        detail: response.payload
    }
}

export const minting = async ({address}, {coin = "*", limit = 25, offset = 0}) => {
    if (!address) throw new GraphQLYogaError(`Address required!`)
    const response = await indexer.minting(address, coin, {limit, offset})
    if (!response.ok) throw new GraphQLYogaError(response.message)
    const result = []

    for (let tr of response.payload){
        const {type, version, hash, success, vm_status, gas_used, timestamp} = tr
        result.push({
            type,
            version,
            hash,
            success,
            vm_status,
            gas_used,
            timestamp,
            amount: tr.payload.arguments[1],
            coin: coin === "*" ? tr.payload.function : coin,
            detail: tr
        })
    }

    return result
}

const getTransBody = data => {
    const {type, version, hash, success, vm_status, gas_used, timestamp} = data

    return{
        type,
        version,
        hash,
        success,
        vm_status,
        gas_used,
        timestamp,
        amount: 0,
        detail: data
    }
}

export const sentTransactions = async ({address}, {limit = 25, offset = 0}) => {
    if (!address) throw new GraphQLYogaError(`Address required!`)
    const response = await indexer.sentTransactions(address, {limit, offset})
    if (!response.ok) throw new GraphQLYogaError(response.message)
    const result = []

    for (let tr of response.payload){
        result.push(getTransBody(tr))
    }

    return result
}

export const receivedTransactions = async ({address}, {limit = 25, offset = 0}) => {
    if (!address) throw new GraphQLYogaError(`Address required!`)
    const response = await indexer.receivedTransactions(address, {limit, offset})
    if (!response.ok) throw new GraphQLYogaError(response.message)
    const result = []

    for (let tr of response.payload){
        result.push(getTransBody(tr))
    }

    return result
}

export const proposal = async ({address}, {limit = 25, offset = 0}) => {
    if (!address) throw new GraphQLYogaError(`Address required!`)
    const response = await indexer.proposalTransactions(address, {limit, offset})
    if (!response.ok) throw new GraphQLYogaError(response.message)
    const result = []

    for (let tr of response.payload){
        const {type, version, hash, success, vm_status, timestamp, id, round, epoch} = tr
        result.push({
            type,
            version,
            hash,
            success,
            vm_status,
            timestamp,
            id,
            round,
            epoch,
            detail: tr
        })
    }

    return result
}

export const rounds = async ({address}) => {
    if (!address) throw new GraphQLYogaError(`Address required!`)
    const response = await indexer.roundsPerEpoch(address)
    if (!response.ok) throw new GraphQLYogaError(response.message)
    const result = []

    for(let r of response.payload){
        result.push({
            epoch: r.epoch,
            rounds: r.rounds
        })
    }

    return result
}

export const transactions = async ({address}, {order = "timestamp desc", limit = 25, offset = 0}, context, info) => {
    if (!address) throw new GraphQLYogaError(`Address required!`)
    const response = await indexer.transactions(address, {order, limit, offset})
    if (!response.ok) throw new GraphQLYogaError(response.message)
    const result = []

    for(let r of response.payload){
        const {type, version, hash, success, vm_status, sender, gas_used, timestamp} = r

        result.push({
            type,
            version,
            hash,
            success,
            vm_status,
            sender,
            gas_used,
            timestamp,
            detail: r
        })
    }

    return result
}