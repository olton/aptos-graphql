import {Aptos} from "@olton/aptos-api";
import {datetime} from "@olton/datetime";

const Query = {
    hello: () => "Hello from Aptos GraphQL Server!",
    health: async (_, args) => {
        const nodes = !args.node && !args.nodes ?
            [config.aptos.api] :
            args.node ? [args.node] : [...args.nodes]
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
        const nodes = !args.node && !args.nodes ?
            [config.aptos.api] :
            args.node ? [args.node] : [...args.nodes]
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
    },
    transactionsCount: async () => {
        const rows = await indexer.transCount()
        let success = 0, failed = 0, unknown = 0,
            state_checkpoint_transaction = 0, block_metadata_transaction = 0,
            user_transaction = 0, genesis_transaction = 0

        const result = {
            success: "0",
            failed: "0",
            unknown: "0",
            state_checkpoint_transaction: "0",
            block_metadata_transaction: "0",
            user_transaction: "0",
            genesis_transaction: "0",
        }

        for(let r of rows) {
            result[r.type] = r.counter
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