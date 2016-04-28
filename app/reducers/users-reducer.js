'use strict';

import Auth from '../helpers/auth';
import { merge } from '../helpers/helpers';
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

export default (state = initial, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return initial;
        break;

        case REQUEST_LOGIN:
            return merge(state, {
                isLoading: true,
            });
        break;

        case RECEIVE_LOGIN_SUCCESS:
            return merge(state, {
                isLoading: false,
                data: {
                    user: action.user,
                    token: action.token
                },
                errors: [],
            });
        break;

        case RECEIVE_LOGIN_ERROR:
            return merge(state, {
                isLoading: false,
                data: [],
                errors: action.errors,
            });
        break;

        case REQUEST_REGISTER_USER:
            return merge(state, {
                isLoading: true,
            });
        break;

        case RECEIVE_REGISTER_USER_SUCCESS:
            return merge(state, {
                isLoading: false,
                data: {
                    user: action.user,
                },
                errors: [],
            });
        break;

        case RECEIVE_REGISTER_USER_ERROR:
            return merge(state, {
                isLoading: false,
                data: [],
                errors: action.errors,
            });
        break;

        case REQUEST_UPDATE_USER:
            return merge(state, {
                isLoading: true,
            });
        break;

        case RECEIVE_UPDATE_USER_SUCCESS:
            return merge(state, {
                isLoading: false,
                data: {
                    user: action.user,
                },
                errors: [],
            });
        break;

        case RECEIVE_UPDATE_USER_ERROR:
            return merge(state, {
                isLoading: false,
                data: {},
                errors: action.errors,
            });
        break;

        default:
            return state;
        break;
    }
};
