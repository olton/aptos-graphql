import {datetime} from "@olton/datetime";
import {Aptos} from "@olton/aptos-api";

export const ledger = async (_, args) => {
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
}