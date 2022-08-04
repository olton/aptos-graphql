export const version = {
    subscribe: async function* () {
        while (true) {
            const ledger = globalThis.ledger
            yield {
                version: {
                    chain_id: ledger.chain_id,
                    epoch: ledger.epoch,
                    version: ledger.ledger_version,
                    role: ledger.node_role,
                    timestamp: ledger.ledger_timestamp,
                }
            }
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    },
}