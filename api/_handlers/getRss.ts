import { assembleResult, prepareCnnRss } from '../_converters'
import { fetchCnnRss } from '../_services/_fetchCnnRss'
export async function getRss(res: any) {
  let items = await fetchCnnRss()

  let msg = `here's the rss from cnn`
  let richResponse = prepareCnnRss(items)
  let result = assembleResult(richResponse, msg)
  return result
}
