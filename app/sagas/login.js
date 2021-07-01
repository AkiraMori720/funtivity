import {put, takeLatest} from 'redux-saga/effects';

import * as types from '../actions/actionsTypes';
import {setUser} from "../actions/login";
import AsyncStorage from "@react-native-community/async-storage";
import {CURRENT_USER} from "../constants/keys";
import firebaseSdk from "../lib/firebaseSdk";
import {appStart, ROOT_INSIDE, ROOT_OUTSIDE} from "../actions/app";


const handleLoginSuccess = function* handleLoginSuccess({ data }) {
	yield put(setUser(data));
	yield put(appStart({root: ROOT_INSIDE}));
};

const handleLogout = function* handleLogout() {
	yield AsyncStorage.removeItem(CURRENT_USER);
	yield firebaseSdk.signOut();
	yield put(appStart({root: ROOT_OUTSIDE}));
};

const handleSetUser = function* handleSetUser({ user }) {

};

const root = function* root() {
	yield takeLatest(types.LOGIN.SUCCESS, handleLoginSuccess);
	yield takeLatest(types.LOGOUT, handleLogout);
	yield takeLatest(types.USER.SET, handleSetUser);
};
export default root;
