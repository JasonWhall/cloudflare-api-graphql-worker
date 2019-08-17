import { ApolloServer } from 'apollo-server-cloudflare';
import { graphqlCloudflare } from 'apollo-server-cloudflare/dist/cloudflareApollo';
import resolvers from '../resolvers';
import { typeDefs } from '../schema';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
});

const apollo = (request, _graphQLOptions) => {
  
  server.context  = {
        headers: {
            'X-Auth-Key': request.headers.get('x-auth-key'),
            'X-Auth-Email': request.headers.get('x-auth-email')
        }
  }
  return graphqlCloudflare(() => server.createGraphQLServerOptions(request))(request)
}

export default apollo
