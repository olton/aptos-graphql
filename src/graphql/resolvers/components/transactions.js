import {GraphQLYogaError} from "@graphql-yoga/node";
import {Account} from "@olton/aptos-api";

const USER_TRANS = 'user_transaction'
const META_TRANS = 'block_metadata_transaction'
const GENESIS_TRANS = 'genesis_transaction'
const STATE_TRANS = 'state_checkpoint_transaction'

export const responseTransaction = tr => {
    const {type, version, hash, success, vm_status, gas_used, timestamp} = tr

    return {
        type,
        version,
        hash,
        success,
        vm_status,
        gas_used,
        timestamp,
        detail: tr
    }
}

export const transactionsCount = async () => {
    const rows = await arch.transactionsCount()

    const result = {
    }

    if (!rows.ok) {
        throw new GraphQLYogaError(rows.message)
    }

    for(let r of rows.payload) {
        result[r.counter_type] = r.counter_value
    }

    return result
}

export const transaction = async (_, {hash: tr_hash, ver}) => {
    if (!tr_hash && (!ver && ver !== 0)) throw new GraphQLYogaError(`Transaction hash or version not defined!`)

    let response

    if (tr_hash) {
        response = await aptos.getTransactionByHash(tr_hash)
    } else {
        response = await aptos.getTransactionByVersion(ver)
    }

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return responseTransaction(response.payload)
}

export const transactions = async (_, {limit, start}) => {
    const response = await aptos.getTransactions({limit, start})

    if (!response.ok) throw new GraphQLYogaError(response.message)

    const result = []

    for (let r of response.payload) {
        result.push(responseTransaction(r))
    }

    return result
}

export const signTransaction = async (_, {pk, pb, payload}) => {
    if (!pk) throw new GraphQLYogaError(`The private key must be specified!`)
    if (!payload) throw new GraphQLYogaError(`The transaction body (payload) must be specified!`)

    const signer = new Account(pk, pb)
    const trxBody = typeof payload === 'string' ? payload : JSON.stringify(payload)
    const signedTrx = await aptos.signTransaction(signer, trxBody)

    if (!signedTrx.ok) throw new GraphQLYogaError(signedTrx.message)

    return signedTrx.payload
}

export const submitTransaction = async (_, {pk, pb, payload}) => {
    if (!pk) throw new GraphQLYogaError(`The private key must be specified!`)
    if (!payload) throw new GraphQLYogaError(`The transaction body (payload) must be specified!`)

    const signer = new Account(pk, pb)
    const trxBody = typeof payload === 'string' ? JSON.parse(payload) : payload
    const response = await aptos.submitTransaction(signer, trxBody)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return response.payload
}

