import { login } from './login';
import { publishEvent } from './publishEvent';
import { registerSensor } from './registerSensor';
import { revokeSensor } from './revokeSensor';

export const Mutation = {
	login: login,
	publishEvent: publishEvent,
	registerSensor: registerSensor,
	revokeSensor: revokeSensor
};
