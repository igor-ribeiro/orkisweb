'use strict';

import thunkMiddleware from 'redux-thunk';
import {
    createStore,
    applyMiddleware
} from 'redux';
import AppReducer from '../reducers/app-reducer';

export default createStore(
    AppReducer,
    applyMiddleware(
        thunkMiddleware
    )
);
