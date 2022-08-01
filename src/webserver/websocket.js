import {WebSocketServer, WebSocket} from "ws";

export const websocket = (server) => {
    globalThis.wss = new WebSocketServer({ server })

    wss.on('connection', (ws, req) => {

        const ip = req.socket.remoteAddress

        ws.send(JSON.stringify({
            channel: "welcome",
            data: `Welcome to Server v${appVersion}`
        }))

        ws.on('message', async (msg) => {
            const {channel, data} = JSON.parse(msg)

            switch (channel) {
                case "health": {
                    response(ws, channel, {health: cache.health})
                    break
                }
                case "ledger": {
                    response(ws, channel, {ledger: cache.ledger})
                    break
                }
                case "gas-usage": {
                    response(ws, channel, {gas: cache.gasUsage})
                    break
                }
                case "user-gas-usage": {
                    response(ws, channel, {gas: cache.userGasUsage})
                    break
                }
                case "avg-gas-used": {
                    response(ws, channel, {gas: cache.avgGasUsed})
                    break
                }
                case "operations-count": {
                    response(ws, channel, {operations: cache.operationsCount})
                    break
                }
                case "transactions-by-type": {
                    response(ws, channel, {transactions: cache.transactionsByType})
                    break
                }
                case "transactions-by-result": {
                    response(ws, channel, {transactions: cache.transactionsByResult})
                    break
                }
                case "gauge-transactions-per-minute": {
                    response(ws, channel, {
                        all: cache.gaugeTransPerMinuteAll,
                        user: cache.gaugeTransPerMinuteUser,
                        meta: cache.gaugeTransPerMinuteMeta
                    })
                    break
                }
                case "gauge-transactions-per-minute-meta": {
                    response(ws, channel, {
                        meta: cache.gaugeTransPerMinuteMeta
                    })
                    break
                }
                case "gauge-transactions-per-minute-check": {
                    response(ws, channel, {
                        meta: cache.gaugeTransPerMinuteCheck
                    })
                    break
                }
                case "gauge-transactions-per-minute-user": {
                    response(ws, channel, {
                        user: cache.gaugeTransPerMinuteUser,
                    })
                    break
                }
                case "gauge-transactions-per-minute-all": {
                    response(ws, channel, {
                        all: cache.gaugeTransPerMinuteAll,
                    })
                    break
                }
                case "current-round": {
                    response(ws, channel, {round: cache.currentRound})
                    break
                }
                case "rounds-per-epoch": {
                    response(ws, channel, {round: cache.roundsPerEpoch})
                    break
                }
                case "rounds-per-second": {
                    response(ws, channel, {tps: cache.roundsPerSecond})
                    break
                }
                case "user-trans-per-second": {
                    response(ws, channel, {tps: cache.userTransPerSecond})
                    break
                }
            }
        })
    })
}

export const response = (ws, channel, data) => {
    ws.send(JSON.stringify({
        channel,
        data
    }))
}

export const broadcast = (data) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data))
        }
    })
}
