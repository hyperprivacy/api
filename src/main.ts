import { ApolloServer } from "apollo-server";

import { typeDefs } from "./typeDefs";
import { Query } from "./queries";

const resolvers = {
  Query
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
