import { fetchCovidStats } from './_services/_fetchCovidStats'
import { fetchGithubTrendingWeekly } from './_services/_fetchGithubTrending'
import { assembleResult, prepareGithub, prepareCovid } from './_converters'

import { getRss, getRssBasic } from './_handlers/getRss'
import { googleNews } from './_handlers/googleNews'

module.exports = async (req, res) => {
  // console.log(req.body)

  if (
    req.body.originalDetectIntentRequest &&
    req.body.originalDetectIntentRequest.source === 'google'
  ) {
    let action = req.body.queryResult.action
    console.log('its from google', action)
    // console.log(res)

    if (action === 'news.Search') {
      let result = await googleNews(req)

      res.json(result)
    } else if (action === 'get-rss') {
      let rssMap = new Map()
      rssMap.set(
        'new york times',
        'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
      )
      rssMap.set('hacker news', 'https://news.ycombinator.com/rss')
      rssMap.set('cnn', 'http://rss.cnn.com/rss/edition.rss')
      rssMap.set('gsmarena', 'https://www.gsmarena.com/rss-news-reviews.php3')

      let website = req.body.queryResult.parameters.website

      if (website === 'cnn') {
        let result = await getRss()
        res.json(result)
      } else {
        let url = rssMap.get(website)
        let result = await getRssBasic(website, url)
        res.json(result)
      }
    } else if (action === 'covid.stats') {
      let items = await fetchCovidStats()

      let msg = `here's the latest stats on covid`
      let richResponse = prepareCovid(items)
      let result = assembleResult(richResponse, msg)

      res.json(result)
    } else if (action === 'github.trendingWeekly') {
      let items = await fetchGithubTrendingWeekly()

      let msg = `here's what's trending on github`
      let richResponse = prepareGithub(items)
      let result = assembleResult(richResponse, msg)

      res.json(result)
    } else {
      let result = {
        fulfillmentText: 'something went wrong',
      }
      res.json(result)
    }
  } else {
    let result = {
      fulfillmentText: 'its all cool man',
    }
    res.json(result)
  }
}
