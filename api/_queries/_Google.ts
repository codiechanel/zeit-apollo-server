import { UserInputError } from "apollo-server-micro";
import axios from "axios";
import { gql } from "apollo-server-micro";
import { emptyResolver } from "./_util";
var xmlparser = require("fast-xml-parser");
const Parser = require("rss-parser");
export const typeDef = gql`
  extend type Query {
    Google: Google
  }
  type Google {
    news(topic: String!): [GoogleNewsItem]
    rss(url: String!): JSON
    suggest(topic: String!): JSON
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
    rss,
    suggest,
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
async function suggest(_, { topic }) {
  let { data } = await axios.get(
    `http://google.com/complete/search?q=${topic}&output=toolbar`
  );
  // console.log(data)
  if (xmlparser.validate(data) === true) {
    //optional (it'll return an object in case it's not valid)
    var options = {
      parseAttributeValue: true,
      /*  attrValueProcessor: (val, attrName) =>
        he.decode(val, { isAttributeValue: true }), */
      ignoreAttributes: false,
    };
    var jsonObj = xmlparser.parse(data, options);
    // console.log(jsonObj)
    return jsonObj;
  }
  throw new UserInputError("Cant find this...");
  return { cool: "cool" };
}

async function rss(_, { url }) {
  let parser = new Parser();

  // let url = `https://news.google.com/news/rss/search/section/q/${topic}/${topic}?hl=en&gl=US&ned=us`;

  try {
    // let { data } = await axios.get(url);
    let data = await parser.parseURL(url);

    let result = data.items;
    // console.log('resp', result)
    // result = result.filter((val, i, arr) => {
    //     return (val != null)
    // })

    return result;
  } catch (e) {
    throw new UserInputError("Cant find this...");
    // return null;
  }
}
