# Zeit Apollo Server

> Basic GraphQL Apollo Server + Zeit Now API routes.

## Setup

```
yarn global add now
yarn
now dev
```

"rewrites": [
{
"source": "/(.*)",
"destination": "/api/graphql.js"
}
]

https://zeit-apollo-server.codie.vercel.app/api/dialog

```javascript
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
```

```javascript
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
```

```javascript
let cardResponse = {
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
}
```
