import {combineReducers} from 'redux';
import app from './app';
import login from './login';

export default combineReducers({
    app,
    login,
});
