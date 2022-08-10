import {Account} from "@olton/aptos-api";
import {GraphQLYogaError} from "@graphql-yoga/node";

export const createAccount = () => {
    const acc = new Account()
    return {
        address: acc.address(),
        publicKey: acc.pubKey(),
        authKey: acc.authKey(),
        privateKey: acc.privateKey()
    }
}

export const account = async (_, {addr}) => {
    if (!addr || addr === {} || addr.length === 0)
        throw new GraphQLYogaError(`Address not defined!`)

    const result = []

    for(let a of addr) {
        const response = await aptos.getAccount(a)
        result.push({
            address: a,
            authentication_key: response.ok ? response.payload.authentication_key : "unknown",
            sequence_number: response.ok ? response.payload.sequence_number : -1,
        })
    }
    return result
}

export const resources = async ({address}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)

    const result = []
    const response = await aptos.getAccountResources(address)
    if (!response.ok) throw new GraphQLYogaError(response.message)
    for (let r of response.payload) {
        result.push({
            typename: r.type,
            data: r.data
        })
    }
    return result
}

export const resource = async ({address}, {res}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)

    const response = await aptos.getAccountResource(address, res)
    if (!response.ok) throw new GraphQLYogaError(response.message)

    return {
        typename: response.payload.type,
        data: response.payload.data
    }
}
export const modules = async ({address}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)

    const result = []
    const response = await aptos.getAccountModules(address)
    if (!response.ok) throw new GraphQLYogaError(response.message)
    for (let r of response.payload) {
        result.push({
            bytecode: r.bytecode,
            abi: r.abi
        })
    }
    return result
}

export const module = async ({address}, {mod}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)

    const response = await aptos.getAccountModule(address, mod)
    if (!response.ok) throw new GraphQLYogaError(response.message)

    return {
        bytecode: response.payload.bytecode,
        abi: response.payload.abi
    }
}

export const events = async ({address}, {handle, field}) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)
    if (!handle) throw new GraphQLYogaError(`Event handle not defined!`)
    if (!field) throw new GraphQLYogaError(`Field name not defined!`)

    const result = []
    const response = aptos.getEventsByHandle(address, handle, field)
    if (!response.ok) throw new GraphQLYogaError(response.message)
    for(let r of response.payload) {
        result.push({
            key: r.key,
            sequenceNumber: r.sequence_number,
            typename: r.type,
            data: r.data
        })
    }
    return result
}