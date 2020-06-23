import { UserInputError } from "apollo-server-micro";
import axios from "axios";
import { gql } from "apollo-server-micro";
import { emptyResolver } from "./_util";
const Parser = require("rss-parser");
export const typeDef = gql`
  extend type Query {
    Google: Google
  }
  type Google {
    news(topic: String!): [GoogleNewsItem]
  }
  type GoogleNewsItem {
    guid: String
    title: String
    link: String
    pubDate: String
  }
`;

export const resolvers = {
  Query: {
    Google: emptyResolver,
  },
  Google: {
    news,
  },
};

async function news(_, { topic }) {
  let parser = new Parser();

  let url = `https://news.google.com/news/rss/search/section/q/${topic}/${topic}?hl=en&gl=US&ned=us`;

  try {
    // let { data } = await axios.get(url);
    let data = await parser.parseURL(url);

    let result = data.items;
    //   console.log("resp", result);
    // result = result.filter((val, i, arr) => {
    //     return (val != null)
    // })

    return result;
  } catch (e) {
    throw new UserInputError("Cant find this...");
    // return null;
  }
}
