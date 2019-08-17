import { urlBuilder, checkHeaders } from '../utils'
import { transformLogData } from '../utils/transformers'
import { USER_URL } from '../utils/constants'

export default {
  Query: {
    logpull: async (_parent, args, context) => {
      checkHeaders(context)

      return await fetch
        (urlBuilder(args), { headers: context.headers })
        .then(res => transformLogData(res))
        .catch(e => console.error(e))
    },
    userinfo: async (_parent, _, context) => {
      checkHeaders(context)

      return await fetch
        (USER_URL, { headers: context.headers })
        .then(res => res.json())
        .then(json => json.result)
        .catch(e => console.error(e))
    }
  }
}