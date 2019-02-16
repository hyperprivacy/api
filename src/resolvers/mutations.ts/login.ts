import { MutationResolvers } from '../../types';

export const login: MutationResolvers.LoginResolver = (parent, args, context, info) => {
	return new Promise((resolve) => {
		resolve('token');
	});
};
