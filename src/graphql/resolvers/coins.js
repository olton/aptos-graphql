import {Account, Aptos} from "@olton/aptos-api";
import {GraphQLYogaError} from "@graphql-yoga/node";

export const sendCoins = async (_, {privateKey, publicKey, receiver, amount, coin = Aptos.APTOS_TOKEN}) => {
    if (!privateKey) throw new GraphQLYogaError(`Private Key required!`)
    if (!receiver) throw new GraphQLYogaError(`Receiver address required`)
    if (!amount || +amount <= 0) throw new GraphQLYogaError(`Amount must have a positive value!`)
    if (!coin) throw new GraphQLYogaError(`Coin structure required!`)

    const acc = new Account(privateKey, publicKey)
    console.log(receiver, amount, coin)
    const response = await aptos.sendCoins(acc, receiver, amount, coin)
    console.log(response)

    if (!response.ok) throw new GraphQLYogaError(`Operation failed, because ${response.message}`)

    const balanceResponse = await aptos.getAccountBalance(acc.address(), coin)

    if (!balanceResponse.ok) throw new GraphQLYogaError(`Balance not retrieved, because ${response.message}`)

    return {
        coin: balanceResponse.payload.coin,
        balance: balanceResponse.payload.balance,
        message: "OK"
    }
}