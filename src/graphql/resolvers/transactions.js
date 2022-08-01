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

    for(let r of rows) {
        result[r.type] = r.counter
    }

    return result
}

export const userTransaction = (response) => {
    const {payload: {
        sender, sequenceNumber,
        max_gas_amount, gas_unit_price, expiration_timestamp_secs
    }} = response

    return {
        sender,
        sequenceNumber,
        max_gas_amount,
        gas_unit_price,
        expiration_timestamp_secs,
    }
}

export const metaTransaction = (response) => {
    const {payload: {
        id, epoch, round, proposer,
        previous_block_votes, failed_proposer_indices
    }} = response

    return {
        id,
        epoch,
        round,
        proposer,
        previous_block_votes,
        failed_proposer_indices,
    }
}

export const transaction = async (_, {hash: tr_hash}) => {
    if (!tr_hash) throw new GraphQLYogaError(`Transaction hash not defined!`)

    const response = await aptos.getTransaction(tr_hash)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return {detail: response.payload}
}