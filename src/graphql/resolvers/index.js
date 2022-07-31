import {Aptos} from "@olton/aptos-api";
import {datetime} from "@olton/datetime";

const Query = {
    hello: () => "Hello from Aptos GraphQL Server!",
    health: async (_, args) => {
        console.log(args)
        const nodes = args.nodes.length === 0 ? [config.aptos.api] : [...args.nodes]

        const result = []
        for(let node of nodes) {
            const aptos = new Aptos(node)
            const response = await aptos.getHealthy()
            result.push({
                node,
                status: response.ok ? response.payload : response.message
            })
        }
        return result
    },
    ledger: async (_, args) => {
        const nodes = !args.nodes || args.nodes.length === 0 ? [config.aptos.api] : [...args.nodes]
        const result = []
        let state = {
            chain_id: "0",
            epoch: "0",
            ledger_version: "-1",
            oldest_ledger_version: "0",
            ledger_timestamp: ""+datetime().timestamp(),
            node_role: "unknown",
            message: "none"
        }
        for(let node of nodes) {
            const aptos = new Aptos(node)
            const response = await aptos.getLedger()
            if (!response.ok) {
                state.message = response.message
            } else {
                state = {
                    ...response.payload,
                    message: "OK"
                }
            }
            result.push({node, state})
        }
        return result
    },
    address: async (_, args) => {
        const addr = args.addr
        const result = []
        for(let a of addr) {
            const aptos = new Aptos(config.aptos.api)
            const response = await aptos.getAccount(a)
            result.push({
                address: a,
                authentication_key: response.ok ? response.payload.authentication_key : "unknown",
                sequence_number: response.ok ? response.payload.sequence_number : -1,
                message: response.ok ? "OK" : response.message
            })
        }
        return result
    }
}

const Address = {
    balance: async (root, args, context, info) => {
        const result = []
        const aptos = new Aptos(config.aptos.api)
        const response = await aptos.getAccountBalance(root.address, args.coin)
        return {
            coin: response.ok ? response.payload.coin : "unknown",
            balance: response.ok ? response.payload.balance : -1,
            message: response.ok ? "OK" : response.message
        }
    }
}

export const resolvers = {Query, Address}