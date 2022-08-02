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

export const minting = async (_, {addr, limit = 25, offset = 0}) => {
    if (!addr) throw new GraphQLYogaError(`Address required!`)
    const response = await indexer.minting(addr, {limit, offset})
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
            detail: tr
        })
    }

    return result
}