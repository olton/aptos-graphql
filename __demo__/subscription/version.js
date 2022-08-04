import EventSource from "eventsource"

const url = new URL('http://localhost:4000/graphql')
url.searchParams.append(
    'query',
    /* GraphQL */ `
        subscription version {
            version {
                chain_id
                epoch
                version
                timestamp
                role
            }
        }
    `,
)
// url.searchParams.append('variables', JSON.stringify({ from: 10 }))

const eventsource = new EventSource(url.toString(), {
    withCredentials: true, // This is required for cookies
})

eventsource.onmessage = function (event) {
    const data = JSON.parse(event.data)
    console.log(data.data.version)
}