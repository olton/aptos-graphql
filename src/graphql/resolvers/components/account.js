import {Account, Aptos} from "@olton/aptos-api";
import {GraphQLYogaError} from "@graphql-yoga/node";
import {address} from "./address.js";

export const createAccount = () => {
    const acc = new Account()
    return {
        address: acc.address(),
        publicKey: acc.pubKey(),
        authKey: acc.authKey(),
        privateKey: acc.privateKey()
    }
}

export const account = async (_, {pk, addr}) => {
    if (!pk) throw new GraphQLYogaError(`PrivateKey required!`)
    const acc = new Account(pk, addr)
    const address = acc.address()
    const response = await aptos.getAccount(address)
    return {
        address,
        authentication_key: response.ok ? response.payload.authentication_key : "unknown",
        sequence_number: response.ok ? response.payload.sequence_number : -1,
        message: response.ok ? "OK" : response.message
    }
}