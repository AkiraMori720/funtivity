import * as types from './actionsTypes';

export function loginRequest(credentials) {
	return {
		type: types.LOGIN.REQUEST,
		credentials
	};
}

export function loginReset() {
	return {
		type: types.LOGIN.RESET,
	}
}

export function loginSuccess(data) {
	return {
		type: types.LOGIN.SUCCESS,
		data
	};
}

export function loginFailure(err) {
	return {
		type: types.LOGIN.FAILURE,
		err
	};
}

export function logout(forcedByServer = false) {
	return {
		type: types.LOGOUT,
		forcedByServer
	};
}

export function setUser(user) {
	return {
		type: types.USER.SET,
		user
	};
}
