import { ResolverFn } from "apollo-server";
import { QueryResolvers } from "../types";

export const books: QueryResolvers.BooksResolver = (
  parent,
  args,
  context,
  info
) => {
  return new Promise(resolve => {
    resolve([
      {
        author: "etst",
        title: "sdf"
      }
    ]);
  });
};
