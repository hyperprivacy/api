import { MutationResolvers } from '../../types';

export const revokeSensor: MutationResolvers.RevokeSensorResolver = (parent, args, context, info) => {
	return new Promise((resolve) => {
		resolve(true);
	});
};
