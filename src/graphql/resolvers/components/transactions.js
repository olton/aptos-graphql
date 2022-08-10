import {GraphQLYogaError} from "@graphql-yoga/node";

const USER_TRANS = 'user_transaction'
const META_TRANS = 'block_metadata_transaction'
const GENESIS_TRANS = 'genesis_transaction'
const STATE_TRANS = 'state_checkpoint_transaction'

export const transactionsCount = async () => {
    const rows = await indexer.transCount()

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

export const transaction = async (_, {hash: tr_hash, version}) => {
    if (!tr_hash && (!version && version !== 0)) throw new GraphQLYogaError(`Transaction hash or version not defined!`)

    let response

    if (tr_hash) {
        response = await aptos.getTransactionByHash(tr_hash)
    } else {
        response = await aptos.getTransactionByVersion(version)
    }

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

export const transactions = async (_, {limit, start}) => {
    const response = aptos.getTransactions({limit, start})

    if (!response.ok) throw new GraphQLYogaError(response.message)

    const result = []

    for (let r of response.payload) {
        const {type, version, hash, success, vm_status, gas_used, timestamp} = r
        result.push({
            type,
            version,
            hash,
            success,
            vm_status,
            gas_used,
            timestamp,
            detail: r
        })
    }

    return result
}