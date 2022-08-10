import {Aptos} from "@olton/aptos-api";
import {GraphQLYogaError} from "@graphql-yoga/node";

export const address = async (_, {addr}) => {
    if (!addr || addr === {} || addr.length === 0)
        throw new GraphQLYogaError(`Address not defined!`)

    const result = []

    for(let a of addr) {
        const aptos = new Aptos(config.aptos.api)
        const response = await aptos.getAccount(a)
        result.push({
            address: a,
            authentication_key: response.ok ? response.payload.authentication_key : "unknown",
            sequence_number: response.ok ? response.payload.sequence_number : -1,
        })
    }
    return result
}