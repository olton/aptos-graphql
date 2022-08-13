import {Account} from "@olton/aptos-api";
import {GraphQLYogaError} from "@graphql-yoga/node";

export const createCollection = async (_, {pk, pb, name, desc, uri = '', max = 0}) => {
    if (!pk) throw new GraphQLYogaError(`Private key required!`)
    if (!name) throw new GraphQLYogaError(`Collection name required!`)
    if (!desc) throw new GraphQLYogaError(`Desc required!`)

    const account = new Account(pk, pb)
    const response = await aptos.createCollection(account, name, desc, uri, max)
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

export const collections = async ({address}, {name}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)
    const response = await aptos.getCollections(address)
    if (!response.ok) throw new GraphQLYogaError(response.message)
    if (name) {
        for(let c in response.payload) {
            if (c.name.toLowerCase() === name.toLowerCase()) {
                return c
            }
        }
        throw new GraphQLYogaError(`Collection ${name} not found!`)
    } else {
        return response.payload
    }
}

export const createToken = async (_, {pk, pb, collection, name, desc, uri = '', supply = 0, max = 0}) => {
    if (!pk) throw new GraphQLYogaError(`Private key required!`)
    if (!collection) throw new GraphQLYogaError(`Collection name required!`)
    if (!name) throw new GraphQLYogaError(`Token name required!`)
    if (!desc) throw new GraphQLYogaError(`Token desc required!`)
    if (!supply) throw new GraphQLYogaError(`You must define a count of supply!`)
    if (!max || max < supply) throw new GraphQLYogaError(`You must define a max value great o equal to supply!`)

    const account = new Account(pk, pb)
    const response = await aptos.createToken(account, collection, name, desc, supply, uri, max)
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

export const tokenBalance = async (_, {owner, creator, collection, name, store = "0x3::token::TokenStore"}) => {
    if (!owner) throw new GraphQLYogaError(`Collection owner required!`)
    if (!creator) throw new GraphQLYogaError(`Collection creator required!`)
    if (!collection) throw new GraphQLYogaError(`Collection name required!`)
    if (!name) throw new GraphQLYogaError(`Token name required!`)

    const response = await aptos.getTokenBalance(owner, creator, collection, name, store)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return response.payload
}

export const tokenData = async (_, {owner, creator, collection, name, store = "0x3::token::Collections"}) => {
    if (!owner) throw new GraphQLYogaError(`Collection owner required!`)
    if (!creator) throw new GraphQLYogaError(`Collection creator required!`)
    if (!collection) throw new GraphQLYogaError(`Collection name required!`)
    if (!name) throw new GraphQLYogaError(`Token name required!`)

    const response = await aptos.getTokenData(owner, creator, collection, name, store)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return response.payload
}
