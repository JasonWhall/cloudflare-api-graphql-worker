
export const BASE_URL = 'https://api.cloudflare.com/client/v4'

export const USER_URL = `${BASE_URL}/user`

export const LOG_PULL_URL = zone_id =>
  `${BASE_URL}/zones/${zone_id}/logs/received?`
