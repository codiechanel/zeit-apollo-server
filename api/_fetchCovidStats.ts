/* import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime) */
export async function fetchCovidStats() {
  const axios = require('axios')
  try {
    let { data } = await axios.get('https://api.covid19api.com/summary')

    let items = data.Countries

    items.sort((a, b) => {
      return b.NewConfirmed - a.NewConfirmed
    })

    items = items.slice(0, 10)
    // NewConfirmed

    // console.log(items)

    return items
  } catch (e) {
    console.log(e.message)
    return []
  }
}

// fetchCovidStats()
