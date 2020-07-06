import { UserInputError } from 'apollo-server-micro'
import axios from 'axios'
import { gql } from 'apollo-server-micro'
import { emptyResolver } from './_util'
export const typeDef = gql`
  extend type Query {
    Rss(limit: Int = 10): Rss
  }
  type Rss {
    cnn(url: String): [CnnRssItem]
    basic(url: String): [BasicRssItem]
  }
  type CnnRssItem {
    title: String
    description: String
    link: String
    publishedParsed: String
    image: String
  }
  type BasicRssItem {
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
    basic,
  },
}

export async function basic(x, { url }) {
  console.log('hey man ', x)

  // console.log(process.env.NODE_ENV, process.env.isprod)

  let json

  if (process.env.NODE_ENV === 'production') {
    json = await axios.get(
      `https://zeit-apollo-server.codie.vercel.app/api/parse-rss?url=${url}`
    )
  } else {
    json = await axios.get(`http://localhost:3000/api/parse-rss?url=${url}`)
  }

  let { data } = json
  let result

  if (x.limit) {
    result = data.items.slice(0, x.limit)
  } else {
    result = data.items
  }

  return result
}

export async function cnn(x, { url }) {
  // console.log('hey man ')

  // console.log(process.env.NODE_ENV, process.env.isprod)

  let json

  if (process.env.NODE_ENV === 'production') {
    json = await axios.get(
      `https://zeit-apollo-server.codie.vercel.app/api/parse-rss?url=${url}`
    )
  } else {
    json = await axios.get(`http://localhost:3000/api/parse-rss?url=${url}`)
  }

  let { data } = json
  let result = []
  data.items.forEach((x) => {
    console.log(x.extensions)

    if (x.extensions) {
      let contentArr = x.extensions.media.group[0].children.content
      let image = contentArr[contentArr.length - 1]
      console.log(image.attrs.url)
      x.image = image.attrs.url
      result.push(x)
    }
  })

  return result
}
