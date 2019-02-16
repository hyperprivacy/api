import { ApolloServer } from 'apollo-server';

import { typeDefs } from './typeDefs';
import { Query } from './resolvers/queries';
import { Mutation } from './resolvers/mutations.ts';

const resolvers = {
	Query: Query,
	Mutation: Mutation
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
