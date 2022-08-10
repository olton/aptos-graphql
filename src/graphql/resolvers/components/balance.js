import {Aptos} from "@olton/aptos-api";
import {GraphQLYogaError} from "@graphql-yoga/node";

export const balance = async ({address}, {coin}, context, info) => {
    if (!address) throw new GraphQLYogaError(`Address not defined!`)
    if (!coin) throw new GraphQLYogaError(`Coin structure not defined!`)

    const aptos = new Aptos(config.aptos.api)
    const response = await aptos.getAccountBalance(address, coin)
    return {
        coin: response.ok ? response.payload.coin : "unknown",
        balance: response.ok ? response.payload.balance : -1
    }
}