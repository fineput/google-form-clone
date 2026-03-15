import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'
import {typeDefs} from './shema';
import {resolvers} from "./resolvers";

const server = new ApolloServer({
    typeDefs,
    resolvers
})

async function startServer() {
    const {url} = await startStandaloneServer(server, {
        listen: {port: 4001 },
        context: async ({req}) => ({
            headers: req.headers,
        })
    });
    console.log(`Сервер запужено за адресою ${url}`)
}

startServer();