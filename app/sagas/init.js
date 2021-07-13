import { put, takeLatest, all } from 'redux-saga/effects';
import RNBootSplash from 'react-native-bootsplash';

import { APP } from '../actions/actionsTypes';
import {appReady, appStart, ROOT_LOADING, ROOT_ONBOARD, ROOT_OUTSIDE} from '../actions/app';
import AsyncStorage from "@react-native-community/async-storage";
import {CURRENT_USER, DO_NOT_SHOW_SPLASH_AGAIN} from "../constants/keys";
import firebaseSdk from "../lib/firebaseSdk";
import {loginSuccess} from "../actions/login";

const restore = function* restore() {
	const user = yield AsyncStorage.getItem(CURRENT_USER);
	const auth = yield firebaseSdk.authorizedUser();
	if(auth && user){
		const user = yield firebaseSdk.getUser(auth.uid);
		if(user){
			yield AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
			yield put(loginSuccess(user));
			return;
		}
	}

	const doNotShow = yield AsyncStorage.getItem(DO_NOT_SHOW_SPLASH_AGAIN);
	if(doNotShow){
		yield put(appStart({ root: ROOT_OUTSIDE }));
	} else {
		yield put(appStart({ root: ROOT_ONBOARD }));
	}
	yield put(appReady({}));
};

const start = function* start() {
	RNBootSplash.hide();
};

const root = function* root() {
	yield takeLatest(APP.INIT, restore);
	yield takeLatest(APP.START, start);
};
export default root;
