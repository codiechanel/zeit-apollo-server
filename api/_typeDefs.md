const { gql } = require('apollo-server-micro')

const typeDefs = gql`
  scalar JSON
  type Query {
    todos: [Todo!]!
    suggest(topic: String!): JSON
    rss(url: String!): JSON
    news(topic: String!): [NewsItem]
  }

  type NewsItem {
    guid: String
    title: String
    link: String
    pubDate: String
  }

  type Todo {
    id: ID!
    description: String
  }
`

module.exports = typeDefs
