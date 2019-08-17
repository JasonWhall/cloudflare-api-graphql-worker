import { LOG_PULL_URL } from './constants'
import { AuthenticationError } from 'apollo-server-cloudflare'

// Builds url and query string from filters array as key1=value1&key2=value2
export const urlBuilder = args => {

  let queryarray = []
  Object.entries(args.filters).forEach(([key, value]) => {
    queryarray.push(`${key}=${value}`)
  })

  return `${LOG_PULL_URL(args.zone)}${queryarray.join('&')}`
}

// Checks Cloudflare API Headers set https://api.cloudflare.com/#getting-started-requests
// TODO: add check for Auth header as Cloudflare now support API Tokens
export const checkHeaders = context => {
  if (!context.headers['X-Auth-Key'] || !context.headers['X-Auth-Email']) {
    throw new AuthenticationError('Cloudflare API Headers not set')
  }
}
