import { UserInputError } from "apollo-server-micro";
import axios from "axios";
import { gql } from "apollo-server-micro";
import {emptyResolver} from "./_util";
export const typeDef = gql`
 extend type Query {
    Raindrop: Raindrop
  }
  type Raindrop {
    listRaindrops(collectionId: String): [RaindropItem]
  }
  type RaindropItem {
    title: String
    created: String
    domain: String
    link: String
    tags: [String]
  }
`;

export const resolvers = {
    Query: {
        Raindrop: emptyResolver,
    },
    Raindrop: {
        listRaindrops,
    },
}

export async function listRaindrops(_, { collectionId }) {
  let { data } = await axios.get(
    `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=50`,
    {
      headers: {
        Authorization: "Bearer 24267bd7-f03a-4525-94e6-9f198ec7d655",
      },
    }
  );
  return data.items;
}
