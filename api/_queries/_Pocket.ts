import { UserInputError } from 'apollo-server-micro'
import axios from 'axios'
import { gql } from 'apollo-server-micro'
import {emptyResolver} from "./_util";
export const typeDef = gql`
 extend type Query {
    Pocket: Pocket
  }
  type Pocket {
    listPocketArticles(
      tag: String
      favorite: String
      count: Int
    ): [PocketArticle]
    untaggedPocketArticles(count: Int): [PocketArticle]
    deletePocketArticle(item_id: String!): PocketArticle
  }
  type PocketArticle {
    item_id: String!
    resolved_title: String
    excerpt: String
    top_image_url: String
    time_added: String
    resolved_url: String
    favorite: String
    status: String
    tags: JSON
  }
`

export const resolvers = {
  Query: {
    Pocket: emptyResolver,
  },
  Pocket: {
    // pocket
    listPocketArticles: listPocketArticles,
    untaggedPocketArticles: untaggedPocketArticles,
    deletePocketArticle,
  },
}

export async function deletePocketArticle(_, { item_id }) {
  // const item_id = params.item_id
  let url = `https://getpocket.com/v3/send`
  let data = {
    consumer_key: '74526-c44ecf2ce73c84efc8f0eff9',
    access_token: '60be81da-fdbd-9b4f-10e8-85b55c',
    actions: [
      {
        action: 'delete',
        item_id: item_id,
      },
    ],
  }
  try {
    await axios.post(url, data)
    /**
     * resp from delete will return this object
     * { action_results: [ true ], status: 1 }
     * but let's just assume
     */
    return { item_id }
  } catch (e) {
    throw new UserInputError('Article not found...')
  }
}

export async function untaggedPocketArticles(_, { count = 20 }) {
  const tag = '_untagged_'
  let url = `https://getpocket.com/v3/get`
  let data = {
    consumer_key: '74526-c44ecf2ce73c84efc8f0eff9',
    access_token: '60be81da-fdbd-9b4f-10e8-85b55c',
    count,
    sort: 'newest',
    state: 'all',
    detailType: 'complete',
  }
  /*  if (tag) {
    // @ts-ignore
    data.tag = tag
  } */
  let resp
  try {
    resp = await axios.post(url, data)
    let items = resp.data.list
    let result = []
    for (let x in items) {
      let item = items[x]
      result.push(item)
    }
    return result.slice(0, count)
  } catch (e) {
    throw new UserInputError('No tag with that name...')
  }
}

export async function listPocketArticles(_, { tag, favorite, count = 20 }) {
  let url = `https://getpocket.com/v3/get`
  let data = {
    consumer_key: '74526-c44ecf2ce73c84efc8f0eff9',
    access_token: '60be81da-fdbd-9b4f-10e8-85b55c',
    count,
    state: 'all',
    detailType: 'complete',
  }
  if (tag) {
    // @ts-ignore
    data.tag = tag
  }

  if (favorite) {
    // console.log('fave')

    // @ts-ignore
    data.favorite = favorite
  }
  let resp
  try {
    resp = await axios.post(url, data)
    let items = resp.data.list
    // console.log(items)

    let result = []
    for (let x in items) {
      let item = items[x]
      result.push(item)
    }
    return result.slice(0, count)
  } catch (e) {
    throw new UserInputError('No tag with that name...')
  }
}
