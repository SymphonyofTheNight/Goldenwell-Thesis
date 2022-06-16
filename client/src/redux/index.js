import { combineReducers } from 'redux';

import auth from './auth.js';
import reducer from './reducer.js';
import CustomerReducer from './customerReducer.js';

export default combineReducers({
    auth,reducer,CustomerReducer
});