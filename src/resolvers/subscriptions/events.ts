import { SubscriptionResolvers } from '../../types';
import { pubsub } from '../../main';

export const events = () => {
	pubsub.asyncIterator([ 'EVENT_PUBLISHED' ]);
};
