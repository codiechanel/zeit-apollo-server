import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export async function fetchRssBasic(url) {
  let query = `{
    Rss {
      basic(url: "${url}") {
        title
        description
        link
        publishedParsed
      }
    }
  }
  `

  try {
    let { data } = await axios.post(
      'https://zeit-apollo-server.codie.now.sh/graphql',
      {
        query,
      }
    )

    let items = data.data.Rss.basic
    // console.log(items)

    let result = []
    for (let x of items) {
      let pubDate = dayjs(x.publishedParsed)
      // @ts-ignore
      x.dateFormatted = dayjs().from(pubDate, true) + ' ago'
      x.unixTimestamp = pubDate.unix()
      result.push(x)
    }
    // console.log(result)
    // let list = Array.from(this.googleNewsItems)
    result.sort((a: any, b: any) => {
      return b.unixTimestamp - a.unixTimestamp
    })

    result = result.slice(0, 10)

    return result
  } catch (e) {
    console.log(e.message)
    return []
  }
}
