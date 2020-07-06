import { fetchGoogleNews } from './_services/_fetchGoogleNews'
import { fetchCovidStats } from './_services/_fetchCovidStats'
import { fetchGithubTrendingWeekly } from './_services/_fetchGithubTrending'
import {
  assembleResult,
  prepareGithub,
  prepareCovid,
  prepareCnnRss,
  prepareGoogleNews,
} from './_converters'

import { fetchCnnRss } from './_services/_fetchCnnRss'

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
      let topic
      if (req.body.queryResult.parameters.person) {
        topic = req.body.queryResult.parameters.person.name
      } else {
        topic = req.body.queryResult.parameters.topic
      }

      let items = await fetchGoogleNews(topic)

      items = items.slice(0, 10)
      let msg = `here's the latest news on ${topic}`

      let richResponse = prepareGoogleNews(items)
      let result = assembleResult(richResponse, msg)

      res.json(result)
    } else if (action === 'get-rss') {
      console.log('action', action)

      let items = await fetchCnnRss()

      items = items.slice(0, 10)

      // console.log(items)

      // items = items.slice(0, 10)
      let msg = `here's the rss from cnn`
      let richResponse = prepareCnnRss(items)
      let result = assembleResult(richResponse, msg)

      res.json(result)
    } else if (action === 'covid.stats') {
      console.log(action)

      let items = await fetchCovidStats()

      // items = items.slice(0, 10)
      let msg = `here's the latest stats on covid`
      let richResponse = prepareCovid(items)
      let result = assembleResult(richResponse, msg)

      res.json(result)
    } else if (action === 'github.trendingWeekly') {
      let items = await fetchGithubTrendingWeekly()

      // items = items.slice(0, 10)
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
