'use strict';

import thunkMiddleware from 'redux-thunk';
import {
    createStore,
    applyMiddleware
} from 'redux';
import UsersReducer from '../reducers/users-reducer';

export default createStore(
    UsersReducer,
    applyMiddleware(
        thunkMiddleware
    )
);
