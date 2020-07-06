import { gql } from "apollo-server-micro";
import { UserInputError } from "apollo-server-micro";
import axios from "axios";
import {emptyResolver} from "./_util";

export const typeDef = gql`
extend type Query {
    Crunchbase: Crunchbase
  }
  type Crunchbase {
    profile(domain: String!): CrunchbaseProfile
  }
  type CrunchbaseProfile {
    domain: String
    permalink: String
    updated_at: Int
    stock_symbol: String
    short_description: String
  }
`;

export const resolvers = {
  Query: {
    Crunchbase: emptyResolver,
  },
  Crunchbase: {
    profile,
  },

}
export async function profile(_, { domain }) {
  try {
    let data8 = await axios.get(
      `https://api.crunchbase.com/v/3/odm-organizations?user_key=c8fa55ed67bb425e58e7b91e5d1f2b49&domain_name=${domain}`
    );
    let crunchbase = data8.data.data.items[0].properties;
    return crunchbase;
  } catch (e) {
    throw new UserInputError("domain not found...");
  }
}
