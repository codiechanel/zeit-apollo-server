import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export function prepareCnnRss(items) {
  let list = []

  for (const x of items) {
    // publishedParsed
    // let dateFormatted = dayjs().from(dayjs(x.publishedParsed), true) + ' ago'
    /*  let  title = "no title"
    if (x.title) {
      title = x.title
    } */
    let item: any = {
      title: x.title,
      // description: x.description,
      openUrlAction: {
        url: x.link,
      },
      footer: x.dateFormatted,
    }
    if (x.description) {
      item.description = x.description
    }
    list.push(item)
  }

  console.log(list)

  return list
}

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

export function prepareGoogleNews(items) {
  let list = []
  for (const x of items) {
    let item = {
      title: x.title,
      openUrlAction: {
        url: x.link,
      },
      description: x.contentSnippet,
      footer: x.dateFormatted,
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
