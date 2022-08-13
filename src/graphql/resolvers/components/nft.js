import {Account} from "@olton/aptos-api";
import {GraphQLYogaError} from "@graphql-yoga/node";
import {responseTransaction} from "./transactions.js";

export const createCollection = async (_, {pk, pb, name, desc, uri = '', max = 0}) => {
    if (!pk) throw new GraphQLYogaError(`Private key required!`)
    if (!name) throw new GraphQLYogaError(`Collection name required!`)
    if (!desc) throw new GraphQLYogaError(`Desc required!`)

    const account = new Account(pk, pb)
    const response = await aptos.createCollection(account, name, desc, uri, max)
    if (!response.ok) throw new GraphQLYogaError(response.message)

    return responseTransaction(response.payload)
}

export const collections = async ({address}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)

    const response = await aptos.getCollections(address)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return response.payload
}

export const collection = async ({address}, {name}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)
    if (!name) throw new GraphQLYogaError(`Collection name required!`)

    const response = await aptos.getCollection(address, name)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return response.payload
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

    return responseTransaction(response.payload)
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

export const accountTokenBalance = async ({address}, {collection, name, store = "0x3::token::TokenStore"}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)
    if (!collection) throw new GraphQLYogaError(`Collection name required!`)
    if (!name) throw new GraphQLYogaError(`Token name required!`)

    const response = await aptos.getTokenBalance(address, address, collection, name, store)

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

export const accountTokenData = async ({address}, {collection, name, store = "0x3::token::Collections"}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)
    if (!collection) throw new GraphQLYogaError(`Collection name required!`)
    if (!name) throw new GraphQLYogaError(`Token name required!`)

    const response = await aptos.getTokenData(address, address, collection, name, store)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return response.payload
}

export const createTokenOffer = async (_, {pk, pb, receiver, creator, collection, token, amount}) => {
    if (!pk) throw new GraphQLYogaError(`Private key must be defined!`)
    if (!receiver) throw new GraphQLYogaError(`Receiver address required!`)
    if (!creator) throw new GraphQLYogaError(`Creator address required!`)
    if (!collection) throw new GraphQLYogaError(`Collection name required!`)
    if (!token) throw new GraphQLYogaError(`Token name required!`)
    if (!amount) throw new GraphQLYogaError(`You must specify an amount value!`)

    const account = new Account(pk, pb)
    const response = await aptos.tokenCreateOffer(account, receiver, creator, collection, token, amount)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return responseTransaction(response.payload)
}

export const claimTokenOffer = async (_, {pk, pb, claimer, creator, collection, token}) => {
    if (!pk) throw new GraphQLYogaError(`Private key must be defined!`)
    if (!claimer) throw new GraphQLYogaError(`Claimer address required!`)
    if (!creator) throw new GraphQLYogaError(`Creator address required!`)
    if (!collection) throw new GraphQLYogaError(`Collection name required!`)
    if (!token) throw new GraphQLYogaError(`Token name required!`)

    const account = new Account(pk, pb)
    const response = await aptos.tokenClaimOffer(account, claimer, creator, collection, token)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return responseTransaction(response.payload)
}


export const cancelTokenOffer = async (_, {pk, pb, receiver, creator, collection, token}) => {
    if (!pk) throw new GraphQLYogaError(`Private key must be defined!`)
    if (!receiver) throw new GraphQLYogaError(`Claimer address required!`)
    if (!creator) throw new GraphQLYogaError(`Creator address required!`)
    if (!collection) throw new GraphQLYogaError(`Collection name required!`)
    if (!token) throw new GraphQLYogaError(`Token name required!`)

    const account = new Account(pk, pb)
    const response = await aptos.tokenCancelOffer(account, receiver, creator, collection, token)

    if (!response.ok) throw new GraphQLYogaError(response.message)

    return responseTransaction(response.payload)
}

