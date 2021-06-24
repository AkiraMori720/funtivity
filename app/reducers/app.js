import { APP, APP_STATE } from '../actions/actionsTypes';

const initialState = {
	root: null,
	isMasterDetail: false,
	text: null,
	ready: false,
	inactive: false,
	foreground: true,
	background: false
};

export default function app(state = initialState, action) {
	switch (action.type) {
		case APP_STATE.FOREGROUND:
			return {
				...state,
				inactive: false,
				foreground: true,
				background: false
			};
		case APP_STATE.BACKGROUND:
			return {
				...state,
				inactive: false,
				foreground: false,
				background: true
			};
		case APP_STATE.INACTIVE:
			return {
				...state,
				inactive: true,
				foreground: false,
				background: false
			};
		case APP.START:
			return {
				...state,
				root: action.root,
				text: action.text
			};
		case APP.INIT:
			return {
				...state,
				ready: false
			};
		case APP.READY:
			return {
				...state,
				ready: true
			};
		case APP.SET_MASTER_DETAIL:
			return {
				...state,
				isMasterDetail: action.isMasterDetail
			};
		default:
			return state;
	}
}
