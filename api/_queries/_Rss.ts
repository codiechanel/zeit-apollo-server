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
    image: String
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
