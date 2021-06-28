import { all } from 'redux-saga/effects';
import init from './init';
import login from './login';

const root = function* root() {
    yield all([
        init(),
        login()
    ]);
};

export default root;
