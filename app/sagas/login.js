import { call, cancel, delay, fork, put, race, select, take, takeLatest } from 'redux-saga/effects';

import * as types from '../actions/actionsTypes';
import {appStart, ROOT_INSIDE} from "../actions/app";

const handleLoginRequest = function* handleLoginRequest({ credentials }) {
	console.log('credential', credentials);
	yield put(appStart({ root: ROOT_INSIDE }));
};


const handleLoginSuccess = function* handleLoginSuccess({ data }) {

};

const handleLogout = function* handleLogout() {

};

const handleSetUser = function* handleSetUser({ user }) {

};

const root = function* root() {
	yield takeLatest(types.LOGIN.REQUEST, handleLoginRequest);
	yield takeLatest(types.LOGOUT, handleLogout);
	yield takeLatest(types.USER.SET, handleSetUser);
};
export default root;
