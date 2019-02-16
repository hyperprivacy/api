import { QueryResolvers } from '../../types';

export const organization: QueryResolvers.OrganizationResolver = (parent, args, context, info) => {
	return new Promise((resolve) => {
		resolve({ id: '1', name: 'BWM' });
	});
};
