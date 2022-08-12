import {Account} from "@olton/aptos-api";
import {GraphQLYogaError} from "@graphql-yoga/node";

export const createCollection = async (_, {pk, pb, name, desc, uri, max}) => {
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