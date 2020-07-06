import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export async function fetchGoogleNews(topic) {
  let query = `{  Google {
      news(topic: "${topic}") {
        title
        guid
        link
        pubDate
      }
    } }`

  try {
    let { data } = await axios.post(
      'https://zeit-apollo-server.codie.now.sh/graphql',
      {
        query,
      }
    )

    let items = data.data.Google.news
    let result = []
    for (let x of items) {
      let pubDate = dayjs(x.pubDate)
      // @ts-ignore
      x.dateFormatted = dayjs().from(pubDate, true) + ' ago'
      x.unixTimestamp = pubDate.unix()
      result.push(x)
    }

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
