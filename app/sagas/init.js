import { put, takeLatest, all } from 'redux-saga/effects';
import RNBootSplash from 'react-native-bootsplash';

import { APP } from '../actions/actionsTypes';
import {appReady, appStart, ROOT_OUTSIDE} from '../actions/app';

const restore = function* restore() {
	yield put(appStart({ root: ROOT_OUTSIDE }));
	yield put(appReady({}));
};

const start = function start() {
	RNBootSplash.hide();
};

const root = function* root() {
	yield takeLatest(APP.INIT, restore);
	yield takeLatest(APP.START, start);
};
export default root;
