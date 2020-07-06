import { UserInputError } from 'apollo-server-micro'
import axios from 'axios'
import { gql } from 'apollo-server-micro'
import { emptyResolver } from './_util'
export const typeDef = gql`
  extend type Query {
    Rss: Rss
  }
  type Rss {
    cnn(url: String): [CnnRssItem]
  }
  type CnnRssItem {
    title: String
    description: String
    link: String
    publishedParsed: String
  }
`

export const resolvers = {
  Query: {
    Rss: emptyResolver,
  },
  Rss: {
    cnn,
  },
}

export async function cnn(x, { url }) {
  console.log('hey man ')

  console.log(process.env.NODE_ENV, process.env.isprod)

  let json

  if (process.env.NODE_ENV === 'production') {
    json = await axios.get(
      `https://zeit-apollo-server.codie.vercel.app/api/parse-rss?url=${url}`
    )
  } else {
    json = await axios.get(`http://localhost:3000/api/parse-rss?url=${url}`)
  }

  let { data } = json

  return data.items
}
