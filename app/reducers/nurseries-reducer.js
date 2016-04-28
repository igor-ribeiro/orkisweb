'use strict';

import { merge } from '../helpers/helpers';
import ReducerHelper from './reducer-helper';

import {
    INITIAL,

    REQUEST_NURSERIES,
    RECEIVE_NURSERIES_SUCCESS,
    RECEIVE_NURSERIES_ERROR,

    REQUEST_NURSERY,
    RECEIVE_NURSERY_SUCCESS,
    RECEIVE_NURSERY_ERROR
} from '../actions/nurseries-actions';

const initial = {
    isLoading: false,
    data: {
        nurseries: [],
        nursery: {},
    },
    errors: [],
};

export default (state = initial, action) => {
    switch (action.type) {
        case INITIAL:
            return initial;
        break;

        case REQUEST_NURSERIES:
            return merge(state, {
                isLoading: true,
            });
        break;

        case RECEIVE_NURSERIES_SUCCESS:
            return merge(state, {
                isLoading: false,
                data: merge(state.data, {
                    nurseries: action.nurseries,
                }),
            });
        break;

        case RECEIVE_NURSERIES_ERROR:
            return merge(state, {
                isLoading: false,
                data: merge(state.data, {
                    nurseries: []
                }),
                errors: action.errors,
            });
        break;

        case REQUEST_NURSERY:
            return merge(state,{
                isLoading: true,
            });
        break;

        case RECEIVE_NURSERY_SUCCESS:
            return merge(state, {
                isLoading: false,
                data: merge(state.data, {
                    nursery: action.nursery,
                }),
            });
        break;

        case RECEIVE_NURSERY_ERROR:
            return merge(state, {
                isLoading: false,
                data: merge(state.data, {
                    nursery: {},
                }),
                errors: action.errors,
            });
        break;

        default:
            return state;
        break;
    }
};
