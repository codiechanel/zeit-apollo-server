module.exports = (req, res) => {
  console.log(req.body)

  if (req.body?.originalDetectIntentRequest?.source === 'google') {
    console.log('its from google')

    let googleResponse = {
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
    res.json(googleResponse)
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
