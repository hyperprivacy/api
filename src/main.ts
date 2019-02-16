import { ApolloServer } from 'apollo-server';

import { typeDefs } from './typeDefs';
import { Query } from './resolvers/queries';
import { Mutation } from './resolvers/mutations.ts';
import { RainbowNotificator } from './alerts/rainbow';
import { PubSub } from 'apollo-server';
import { Subscription } from './resolvers/subscriptions';

export const pubsub = new PubSub();

const resolvers = {
	Query: Query,
	Mutation: Mutation,
	Subscription: Subscription
};

export const notificator = new RainbowNotificator(() => {
	notificator.sendAlert('Test alert');

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		cors: {
			origin: process.env.ORIGIN,
			credentials: true
		},
		subscriptions: {
			path: '/graphql'
		}
	});

	server.listen().then(({ url }) => {
		console.log(`Server ready at ${url}`);
	});
});
