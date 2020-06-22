import { UserInputError } from "apollo-server-micro";
import axios from "axios";
import { gql } from "apollo-server-micro";
import { emptyResolver } from "./_util";
export const typeDef = gql`
  extend type Query {
    Npm: Npm
  }
  type Npm {
    downloadsLastMonth(packageName: String!): NpmItem
    downloads(packageName: String!, start: String!, end: String!): NpmItem
  }
  type NpmItem {
    package: String
    downloads: Int
    start: String
    end: String
  }
`;

export const resolvers = {
  Query: {
    Npm: emptyResolver,
  },
  Npm: {
    downloads,
    downloadsLastMonth,
  },
};
export async function downloadsLastMonth(_, { packageName }) {
  let url = `https://api.npmjs.org/downloads/point/last-month/${packageName}`;

  try {
    let { data } = await axios.get(url);

    return data;
  } catch (e) {
    throw new UserInputError("something went wrong ..", e.message);
  }
}
export async function downloads(_, { packageName, start, end }) {
  let url = `https://api.npmjs.org/downloads/point/${start}:${end}/${packageName}`;

  try {
    let { data } = await axios.get(url);

    return data;
  } catch (e) {
    throw new UserInputError("something went wrong ..", e.message);
  }
}
