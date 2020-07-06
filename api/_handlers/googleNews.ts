import { fetchGoogleNews } from '../_services/_fetchGoogleNews'
import { assembleResult, prepareGoogleNews } from '../_converters'
export async function googleNews(req: any) {
  let topic
  if (req.body.queryResult.parameters.person) {
    topic = req.body.queryResult.parameters.person.name
  } else {
    topic = req.body.queryResult.parameters.topic
  }

  let items = await fetchGoogleNews(topic)

  let msg = `here's the latest news on ${topic}`

  let richResponse = prepareGoogleNews(items)
  let result = assembleResult(richResponse, msg)
  return result
}
