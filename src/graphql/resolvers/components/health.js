import {Aptos} from "@olton/aptos-api";

export const health = async (_, args) => {
    const nodes = !args.node && !args.nodes ?
        [config.aptos.api] :
        args.node ? [args.node] : [...args.nodes]

    const result = []
    for(let node of nodes) {
        const aptos = new Aptos(node)
        const response = await aptos.getHealthy()
        console.log(response)
        result.push({
            node,
            status: response.ok ? response.payload : response.message
        })
    }
    return result
}