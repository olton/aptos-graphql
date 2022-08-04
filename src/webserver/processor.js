export const cacheLedger = async () => {
    const ledger = await aptos.getLedger()
    if (ledger.ok) {
        globalThis.ledger = ledger.payload
    }
    setTimeout(cacheLedger, 3000)
}