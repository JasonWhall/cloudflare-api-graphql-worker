# Cloudflare-api-GraphQL-Worker

This is a POC to expose a couple of Cloudflare API endpoints through GraphQL, in Cloudflare Workers. 

![](https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy-downsized.gif)

Credit to source of [Apollo GraphQL, built with Cloudflare Workers](https://github.com/signalnerve/workers-graphql-server)

## Where to Start

As the webpacked package is over the cloudflare worker 1MB limit uncompressed we use [Wrangler](https://github.com/cloudflare/wrangler) to get the compression benefits on upload.

use `npm i && npm run build` to generate the `worker/script.js` output file. This uses webpack.

### Locally

use `npm run dev` to use [cloudworker](https://github.com/dollarshaveclub/cloudworker). This will run a local worker instance on port 3000 by default.

You can then access the instance on http://localhost:3000 and the Playground endpoint on http://localhost:3000/graphql

### Publishing

Pre-requisites:

- Cloudflare Account
- Workers.dev domain
- wrangler.toml file

An example `wrangler.toml` file can be found [here](./wrangler.toml.example). You will also need API keys to publish to cloudflare. More details can be found [in the Cloudflare docs](https://workers.cloudflare.com/docs/quickstart/configuring-and-publishing/)

## Using the GraphQL Instance

At present there are only 2 endpoints exposed through the GraphQL instance.

- *logpull*: An example query to this endpoint would be:
>This requires an enterprise account.

```js
{
  logpull(zone:"$ZONEID", filters: {
    start: "2019-08-17T13:30:44Z",
    end: "2019-08-17T14:30:44Z",
    count: 10,
    fields: [
      ClientIP, 
      ClientRequestHost,
      EdgeStartTimestamp
      ],
    timestamps: rfc3339
  })
  {
    ClientIP,
    ClientRequestHost,
    EdgeStartTimestamp
  }
}
```

This would return a response similar to the below:

```json
{
  "data": {
    "logpull": [
      {
        "ClientIP": "1.1.1.1",
        "ClientRequestHost": "example.com",
        "EdgeStartTimestamp": "2019-08-17T14:07:34Z"
      }
    ]
  }
}
```

- userinfo:
  Returns the user information. An example query would be:

```js
{
  userinfo {
    organizations {
      id
    }
    username
    created_on
    email
  }
}
```
  
A simple example to call this would be:

```bash
curl -g 'http://localhost:3000/?query={userinfo{email}}' -H 'X-Auth-Email: anne@example.com' -H 'X-Auth-Key: abc1234'
```

## Authentication

As the Cloudflare API requires Auth, the `X-Auth-Key` and `X-Auth-Email` are passed through to the resolvers from the request. If these are not present the requests to GraphQL will fail. This also does not currently support API Keys in the Auth header.
