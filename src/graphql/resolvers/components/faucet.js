import {Aptos} from "@olton/aptos-api";
import {Faucet} from "@olton/aptos-api/src/api/faucet.js";
import {GraphQLYogaError} from "@graphql-yoga/node";

export const faucet = async (_, {addr, amount}) => {
    const faucet = new Faucet(config.aptos.faucet, aptos)
    const faucet_response = await faucet.fundAccount(addr, amount)
    const faucet_result = faucet_response.ok && faucet_response.payload.length
    if (!faucet_result) throw new GraphQLYogaError(faucet_response.message)

    const balance_response = await aptos.getAccountBalance(addr, Aptos.APTOS_TOKEN)
    return {
        address: addr,
        coin: balance_response.ok ? balance_response.payload.coin : "unknown",
        balance: balance_response.ok ? balance_response.payload.balance : -1,
    }
}