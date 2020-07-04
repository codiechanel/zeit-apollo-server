import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export async function fetchGoogleNews(topic) {
  let query = `{  Google {
      news(topic: "${topic}") {
        title
        guid
        link
        pubDate
      }
    } }`;

  try {
    let { data } = await axios.post(
      "https://zeit-apollo-server.codie.now.sh/graphql",
      {
        query,
      }
    );

    let items = data.data.Google.news;
    let result = [];
    for (let x of items) {
      let pubDate = dayjs(x.pubDate);
      // @ts-ignore
      x.dateFormatted = dayjs().from(pubDate, true) + " ago";
      x.unixTimestamp = pubDate.unix();
      result.push(x);
    }
    // console.log(result)
    // let list = Array.from(this.googleNewsItems)
    result.sort((a: any, b: any) => {
      /* let [akey, aVal] = a
      let [bkey, bVal] = b*/
      // console.log(aVal.unixTimestamp)
      return b.unixTimestamp - a.unixTimestamp;
    });

    return result;
  } catch (e) {
    console.log(e.message);
    return [];
  }
}
