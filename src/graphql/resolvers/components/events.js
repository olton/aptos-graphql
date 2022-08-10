import {GraphQLYogaError} from "@graphql-yoga/node";

export const events = async (_, {key}) => {
    if (!key) throw new GraphQLYogaError(`Event key not defined!`)

    const result = []
    const response = aptos.getEventsByKey(key)
    if (!response.ok) throw new GraphQLYogaError(response.message)
    for(let r of response.payload) {
        result.push({
            key: r.key,
            sequenceNumber: r.sequence_number,
            typename: r.type,
            data: r.data
        })
    }
    return result
}