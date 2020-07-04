# Zeit Apollo Server

> Basic GraphQL Apollo Server + Zeit Now API routes.

## Setup

```
yarn global add now
yarn
now dev
```

"rewrites": [
{
"source": "/(.*)",
"destination": "/api/graphql.js"
}
]

https://zeit-apollo-server.codie.vercel.app/api/dialog
