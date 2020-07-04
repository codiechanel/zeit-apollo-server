import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export function prepareGithub(items) {
  let list = []
  for (const x of items) {
    let item = {
      title: x.name,
      description: x.description,
      openUrlAction: {
        url: x.url,
      },
      footer: x.stars.toString(),
    }
    list.push(item)
  }

  return list
}

export function prepareCovid(items) {
  let list = []
  for (const x of items) {
    let item = {
      title: x.Country,
      openUrlAction: {
        url: 'https://www.example.com',
      },
      footer: x.NewConfirmed.toString(),
    }
    list.push(item)
  }

  return list
}

export function convertJsonToCarousel(items) {
  let list = []
  for (const x of items) {
    // @ts-ignore
    let dateFormatted = dayjs().from(dayjs(x.pubDate), true) + ' ago'
    // let domain = Util.extractHostname(x.link)
    // let footer = `${domain} - ${dateFormatted}`
    let footer = `${dateFormatted}`
    let item = {
      title: x.title,
      openUrlAction: {
        url: x.link,
      },
      description: x.contentSnippet,
      footer,
      image: {
        url: 'https://developers.google.com/actions/assistant.png',
        accessibilityText: 'Google Assistant Bubbles',
      },
    }
    list.push(item)
  }
  return list
}

export function assembleResult(list, msg) {
  let result = {
    payload: {
      google: {
        expectUserResponse: true,
        richResponse: {
          items: [
            {
              simpleResponse: {
                textToSpeech: msg,
              },
            },
            {
              carouselBrowse: {
                items: list,
              },
            },
          ],
        },
      },
    },
  }
  return result
}
