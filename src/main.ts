import { ApolloServer, gql } from "apollo-server";
import { schema } from "./schema";

const resolvers = {
  Query: {}
};
const server = new ApolloServer({ schema, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
