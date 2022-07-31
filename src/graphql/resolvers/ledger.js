import {Aptos} from "@olton/aptos-api";
import {datetime} from "@olton/datetime";

export const LedgerResolver = {
    Query: {
        async ledger(obj, args, context, info){
            const nodes = !args.node || args.node.length === 0 ? [config.aptos.api] : [...args.node]
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
        }
    }
}