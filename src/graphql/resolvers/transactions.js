import {GraphQLYogaError} from "@graphql-yoga/node";

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

export const transaction = async (_, args) => {
    if (!args.hash && !args.hashes) throw new GraphQLYogaError(`Transaction hash(es) not defined!`)
    const transactions = args.hash ? [args.hash] : [...args.hashes]
    const result = []
    for(let tr of transactions) {
        const response = await aptos.getTransaction(tr)
        if (!response.ok) continue
        const {payload: {
            type, version, hash, state_root_hash, event_root_hash,
            gas_used, success, vm_status, accumulator_root_hash, sender, sequenceNumber,
            max_gas_amount, gas_unit_price, expiration_timestamp_secs, timestamp
        }} = response
        result.push({
            type,
            version,
            hash,
            state_root_hash,
            event_root_hash,
            gas_used,
            success,
            vm_status,
            accumulator_root_hash,
            sender,
            sequenceNumber,
            max_gas_amount,
            gas_unit_price,
            expiration_timestamp_secs,
            timestamp,
        })
    }
    return result
}