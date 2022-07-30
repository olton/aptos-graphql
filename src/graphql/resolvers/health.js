import {Aptos} from "@olton/aptos-api";

export const health = async (node = config.aptos.api) => {
    const aptos = new Aptos(node)
    const response = await aptos.getHealthy()
    return {
        node,
        status: response.ok ? response.payload : response.message
    }
}