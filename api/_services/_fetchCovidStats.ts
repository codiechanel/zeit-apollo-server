/**
 * fetchCovidStats
 *
 * @export
 * @return {*}
 */
export async function fetchCovidStats() {
  const axios = require('axios')
  try {
    let { data } = await axios.get('https://api.covid19api.com/summary')

    let items = data.Countries

    items.sort((a, b) => {
      return b.NewConfirmed - a.NewConfirmed
    })

    items = items.slice(0, 10)

    return items
  } catch (e) {
    console.log(e.message)
    return []
  }
}

// fetchCovidStats()
