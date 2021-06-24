import { all } from 'redux-saga/effects';
import init from './init';

const root = function* root() {
    yield all([
        init()
    ]);
};

export default root;
