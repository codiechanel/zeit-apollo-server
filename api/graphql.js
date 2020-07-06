// import { news, rss, suggest } from "./_resolvers";

const { ApolloServer } = require('apollo-server-micro')

const cors = require('micro-cors')()

// const typeDefs = require('./_typeDefs')
// const resolvers = require("./_resolvers");
import { merge } from 'lodash'
import {
  typeDef as Pocket,
  resolvers as pocketResolvers,
} from './_queries/_Pocket'
import { typeDef as Npm, resolvers as npmResolvers } from './_queries/_Npm'
import {
  typeDef as Google,
  resolvers as googleResolvers,
} from './_queries/_Google'
import {
  typeDef as Raindrop,
  resolvers as raindropResolvers,
} from './_queries/_Raindrop'
import {
  typeDef as Crunchbase,
  resolvers as crunchbaseResolvers,
} from './_queries/_Crunchbase'
import { gql } from 'apollo-server-micro'
// import { typeDef as Query } from "./_Query";

const Query = gql`
  scalar JSON
  type Query {
    _empty: String
  }
`
const resolvers = {}

let typeDefs = [Query, Pocket, Raindrop, Crunchbase, Npm, Google]

const server = new ApolloServer({
  typeDefs,
  resolvers: merge(
    resolvers,
    pocketResolvers,
    raindropResolvers,
    crunchbaseResolvers,
    npmResolvers,
    googleResolvers
  ),
  introspection: true,
  playground: true,
})

exports.config = {
  api: {
    bodyParser: false,
  },
}

// module.exports

const myHandler = (req, res, ...args) => {
  if (req.method === 'OPTIONS') return res.status(200).send()

  const handler = server.createHandler()

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader('Access-Control-Allow-Origin', '*')

  return handler(req, res, ...args)
}
module.exports = cors(myHandler)
// module.exports = cors(server.createHandler());
