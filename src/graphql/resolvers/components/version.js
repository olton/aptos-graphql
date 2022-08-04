export const version = {
    subscribe: async function* () {
        while (true) {
            const response = await aptos.getLedger()
            yield {
                version: {
                    chain_id: response.payload.chain_id,
                    epoch: response.payload.epoch,
                    version: response.payload.ledger_version,
                    role: response.payload.node_role,
                    timestamp: response.payload.ledger_timestamp,
                }
            }
            await new Promise((resolve) => setTimeout(resolve, 10000))
        }
    },
}