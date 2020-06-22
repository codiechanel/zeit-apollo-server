const cuid = require("cuid");
const Parser = require("rss-parser");
var xmlparser = require("fast-xml-parser");
var he = require("he");
var axios = require("axios");
import {
  listPocketArticles,
  deletePocketArticle,
  untaggedPocketArticles,
} from "./_Pocket";
import { listRaindrops } from "./_Raindrop";
import { profile } from "./_Crunchbase";
function emptyResolver(_, { limit = 50, offset = 1 }) {
  /**
   * instead of returning empty json
   * we could use this as convenience
   * if user specifies limit on the root
   * it cascade to child requests
   */
  return {
    limit: limit,
    offset: offset,
  };
}

const resolvers = {
  Pocket: {
    // pocket
    listPocketArticles: listPocketArticles,
    untaggedPocketArticles: untaggedPocketArticles,
    deletePocketArticle,
  },
  Raindrop: {
    listRaindrops,
  },
  Crunchbase: {
    profile,
  },
  Query: {
    news: news,
    rss: rss,
    suggest: suggest,
    Raindrop: emptyResolver,
    Pocket: emptyResolver,
    Crunchbase: emptyResolver,
    todos: () => [
      {
        id: cuid(),
        description: "Stay home, Protect the NHS, Save lives.",
      },
    ],
  },
};

export async function news(_, { topic }) {
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

var options = {
  parseAttributeValue: true,
  /*  attrValueProcessor: (val, attrName) =>
    he.decode(val, { isAttributeValue: true }), */
  ignoreAttributes: false,
};

export async function suggest(_, { topic }) {
  let { data } = await axios.get(
    `http://google.com/complete/search?q=${topic}&output=toolbar`
  );
  // console.log(data)
  if (xmlparser.validate(data) === true) {
    //optional (it'll return an object in case it's not valid)
    var jsonObj = xmlparser.parse(data, options);
    // console.log(jsonObj)
    return jsonObj;
  }
  throw new UserInputError("Cant find this...");
  return { cool: "cool" };
}

export async function rss(_, { url }) {
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

// module.exports = resolvers;
