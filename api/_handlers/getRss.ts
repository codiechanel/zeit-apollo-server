import { assembleResult, prepareCnnRss } from '../_converters'
import { fetchCnnRss } from '../_services/_fetchCnnRss'
import { fetchRssBasic } from '../_services/_fetchRssBasic'
export async function getRss() {
  let items = await fetchCnnRss()

  let msg = `here's the rss from cnn`
  let richResponse = prepareCnnRss(items)
  let result = assembleResult(richResponse, msg)
  return result
}

export async function getRssBasic(website, url) {
  let items = await fetchRssBasic(url)

  let msg = `here's the rss from ${website}`
  let richResponse = prepareCnnRss(items)
  let result = assembleResult(richResponse, msg)
  return result
}
