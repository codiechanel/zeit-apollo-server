/* import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime) */
export async function fetchGithubTrendingWeekly() {
  const axios = require('axios')
  try {
    let { data } = await axios.get(
      'https://ghapi.huchen.dev/repositories?language=javascript&since=weekly'
    )

    data.sort((a, b) => {
      return b.stars - a.stars
    })

    let items = data.slice(0, 10)

    return items
  } catch (e) {
    console.log(e.message)
    return []
  }
}

// fetchCovidStats()
