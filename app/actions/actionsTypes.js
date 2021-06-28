const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const defaultTypes = [REQUEST, SUCCESS, FAILURE];
function createRequestTypes(base, types = defaultTypes) {
	const res = {};
	types.forEach(type => (res[type] = `${ base }_${ type }`));
	return res;
}

export const APP = createRequestTypes('APP', ['START', 'READY', 'INIT', 'INIT_LOCAL_SETTINGS', 'SET_MASTER_DETAIL']);
export const APP_STATE = createRequestTypes('APP_STATE', ['FOREGROUND', 'BACKGROUND', 'INACTIVE']);

// Login events
export const LOGIN = createRequestTypes('LOGIN', [
	...defaultTypes,
	'RESET',
	'SET_SERVICES',
	'SET_PREFERENCE',
	'SET_LOCAL_AUTHENTICATED',
]);
export const USER = createRequestTypes('USER', ['SET']);
export const LOGOUT = 'LOGOUT';

