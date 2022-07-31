import {Aptos} from "@olton/aptos-api";

export const HealthResolver = {
    Query: {
        async health(obj, args, context, info){
            // console.log(args.node.length)

            const nodes = args.node.length === 0 ? [config.aptos.api] : [...args.node]
            const result = []
            for(let node of nodes) {
                const aptos = new Aptos(node)
                const response = await aptos.getHealthy()
                result.push({
                    node,
                    status: response.ok ? response.payload : response.message
                })
            }
            console.log(result)
            return result
        }
    }
}
