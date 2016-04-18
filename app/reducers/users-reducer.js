'use strict';

import Auth from '../helpers/auth';
import { merge } from '../helpers/helpers';
import ReducerHelper from './reducer-helper';
import {
    INITIAL_STATE,

    REQUEST_LOGIN,
    RECEIVE_LOGIN_SUCCESS,
    RECEIVE_LOGIN_ERROR,

    REQUEST_REGISTER_USER,
    RECEIVE_REGISTER_USER_SUCCESS,
    RECEIVE_REGISTER_USER_ERROR,

    REQUEST_UPDATE_USER,
    RECEIVE_UPDATE_USER_SUCCESS,
    RECEIVE_UPDATE_USER_ERROR
} from '../actions/users-actions';

const initial = {
    isLoading: false,
    data: {},
    errors: [],
};

const actions = {
    INITIAL_STATE: (state, action) => {
        return initial;
    },
    
    REQUEST_LOGIN: (state, action) => {
        return merge(state, {
            isLoading: true,
        });
    },

    RECEIVE_LOGIN_SUCCESS: (state, action) => {
        return merge(state, {
            isLoading: false,
            data: {
                user: action.user,
                token: action.token
            },
            errors: [],
        });
    },

    RECEIVE_LOGIN_ERROR: (state, action) => {
        return merge(state, {
            isLoading: false,
            data: [],
            errors: action.errors,
        });
    },

    REQUEST_REGISTER_USER: (state, action) => {
        return merge(state, {
            isLoading: true,
        });
    },

    RECEIVE_REGISTER_USER_SUCCESS: (state, action) => {
        return merge(state, {
            isLoading: false,
            data: {
                user: action.user,
            },
            errors: [],
        });
    },

    RECEIVE_REGISTER_USER_ERROR: (state, action) => {
        return merge(state, {
            isLoading: false,
            data: [],
            errors: action.errors,
        });
    },

    REQUEST_UPDATE_USER: (state, action) => {
        return merge(state, {
            isLoading: true,
        });
    },

    RECEIVE_UPDATE_USER_SUCCESS: (state, action) => {
        return merge(state, {
            isLoading: false,
            data: {
                user: action.user,
            },
            errors: [],
        });
    },

    RECEIVE_UPDATE_USER_ERROR: (state, action) => {
        return merge(state, {
            isLoading: false,
            data: {},
            errors: action.errors,
        });
    },
};

export default (state = initial, action) => ReducerHelper(state, action, actions);
