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