import apollo from './server/apollo'
import playground from './server/playground'

const graphQLOptions = {
  // Set the path for the GraphQL server
  baseEndpoint: '/',
  // Set the path for the GraphQL playground
  // This option can be removed to disable the playground route
  playgroundEndpoint: '/graphql',
  // When a request's path isn't matched, forward it to the origin
  forwardUnmatchedRequestsToOrigin: false,
  // Enable debug mode to return script errors directly in browser
  debug: true,

}

const handleRequest = async request => {
  
  const url = new URL(request.url)
  try {
    if (url.pathname === graphQLOptions.baseEndpoint) {
      return apollo(request, graphQLOptions)
    } else if (
      graphQLOptions.playgroundEndpoint &&
      url.pathname === graphQLOptions.playgroundEndpoint
    ) {
      return playground(request, graphQLOptions)
    } else if (graphQLOptions.forwardUnmatchedRequestsToOrigin) {
      return fetch(request)
    } else {
      return new Response('Not found', { status: 404 })
    }
  } catch (err) {
    return new Response(graphQLOptions.debug ? err : `${err} :Something went wrong`, { status: 500 })
  }
  
  
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})  