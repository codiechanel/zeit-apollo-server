import { fetchGoogleNews } from './_fetchGoogleNews'
import { fetchCovidStats } from './_fetchCovidStats'
import { fetchGithubTrendingWeekly } from './_fetchGithubTrending'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

function prepareGithub(items) {
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

  /* let richResponse = {
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
  }

  return richResponse */
}

function prepareCovid(items) {
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

  /*  let richResponse = {
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
  }

  return richResponse */
}

function convertJsonToCarousel(items) {
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
  /* let richResponse = {
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
  }
  return richResponse */
}

function assembleResult(list, msg) {
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

module.exports = async (req, res) => {
  // console.log(req.body)

  if (req.body?.originalDetectIntentRequest?.source === 'google') {
    let action = req.body?.queryResult?.action
    console.log('its from google', action)
    // console.log(res)

    if (action === 'news.Search') {
      let topic =
        req.body?.queryResult?.parameters?.person?.name ??
        req.body?.queryResult?.parameters?.topic

      let items = await fetchGoogleNews(topic)

      items = items.slice(0, 10)
      let msg = `here's the latest news on ${topic}`

      let richResponse = convertJsonToCarousel(items)
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

/* let googleResponse = {
  payload: {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: 'this is a Google Assistant response',
            },
          },
        ],
      },
    },
  },
} */
/* card */
/* let googleResponse = {
  payload: {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: "Here's an example of a basic card.",
            },
          },
          {
            basicCard: {
              title: 'Title: this is a title',
              subtitle: 'This is a subtitle',
              formattedText:
                'This is a basic card.  Text in a basic card can include "quotes" and\n    most other unicode characters including emojis.  Basic cards also support\n    some markdown formatting like *emphasis* or _italics_, **strong** or\n    __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other\n    things like line  \nbreaks',
              image: {
                url:
                  'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
                accessibilityText: 'Image alternate text',
              },
              buttons: [
                {
                  title: 'This is a button',
                  openUrlAction: {
                    url: 'https://assistant.google.com/',
                  },
                },
              ],
              imageDisplayOptions: 'CROPPED',
            },
          },
          {
            simpleResponse: {
              textToSpeech: 'Which response would you like to see next?',
            },
          },
        ],
      },
    },
  },
} */

let carouselBrowse = {
  payload: {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: "Here's an example of a browsing carousel.",
            },
          },
          {
            carouselBrowse: {
              items: [
                {
                  title: 'Title of item 1',
                  openUrlAction: {
                    url: 'https://example.com',
                  },
                  description: 'Description of item 1',
                  footer: 'Item 1 footer',
                  image: {
                    url:
                      'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
                    accessibilityText: 'Image alternate text',
                  },
                },
                {
                  title: 'Title of item 2',
                  openUrlAction: {
                    url: 'https://example.com',
                  },
                  description: 'Description of item 2',
                  footer: 'Item 2 footer',
                  image: {
                    url:
                      'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
                    accessibilityText: 'Image alternate text',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },
}

let tableResponse = {
  payload: {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: 'This is a table with all the possible fields.',
            },
          },
          {
            tableCard: {
              title: 'Table Title',
              subtitle: 'Table Subtitle',
              image: {
                url:
                  'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
                accessibilityText: 'Alt Text',
              },
              rows: [
                {
                  cells: [
                    {
                      text: 'row 1 item 1',
                    },
                    {
                      text: 'row 1 item 2',
                    },
                    {
                      text: 'row 1 item 3',
                    },
                  ],
                  dividerAfter: false,
                },
                {
                  cells: [
                    {
                      text: 'row 2 item 1',
                    },
                    {
                      text: 'row 2 item 2',
                    },
                    {
                      text: 'row 2 item 3',
                    },
                  ],
                  dividerAfter: true,
                },
                {
                  cells: [
                    {
                      text: 'row 3 item 1',
                    },
                    {
                      text: 'row 3 item 2',
                    },
                    {
                      text: 'row 3 item 3',
                    },
                  ],
                },
              ],
              columnProperties: [
                {
                  header: 'header 1',
                  horizontalAlignment: 'CENTER',
                },
                {
                  header: 'header 2',
                  horizontalAlignment: 'LEADING',
                },
                {
                  header: 'header 3',
                  horizontalAlignment: 'TRAILING',
                },
              ],
              buttons: [
                {
                  title: 'Button Text',
                  openUrlAction: {
                    url: 'https://assistant.google.com',
                  },
                },
              ],
            },
          },
          {
            simpleResponse: {
              textToSpeech: 'Which response would you like to see next?',
            },
          },
        ],
      },
    },
  },
}
