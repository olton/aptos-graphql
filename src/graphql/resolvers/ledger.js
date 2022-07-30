import {Aptos} from "@olton/aptos-api";
import {datetime} from "@olton/datetime";

export const ledger = async (node = config.aptos.api) => {
    const aptos = new Aptos(node)
    const response = await aptos.getLedger()
    let state = {
        chain_id: "0",
        epoch: "0",
        ledger_version: "-1",
        oldest_ledger_version: "0",
        ledger_timestamp: ""+datetime().timestamp(),
        node_role: "unknown",
        message: ""
    }

    if (!response.ok) {
        state.message = response.message
    } else {
        state = {
            ...response.payload,
            message: "OK"
        }
    }

    return {
        node,
        state
    }
}