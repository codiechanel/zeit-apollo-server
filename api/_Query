import { gql } from "apollo-server-micro";
export const typeDef = gql`
  scalar JSON
  type Query {
    Raindrop: Raindrop
    Pocket: Pocket
    Crunchbase: Crunchbase
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
`;
