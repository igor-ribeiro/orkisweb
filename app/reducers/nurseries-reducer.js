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

const actions = {
    INITIAL: ()  => {
        return initial;
    },

    REQUEST_NURSERIES: (state, action) => {
        return merge(state, {
            isLoading: true,
        }); 
    },

    RECEIVE_NURSERIES_SUCCESS: (state, action) => {
        return merge(state, {
            isLoading: false,
            data: merge(state.data, {
                nurseries: action.nurseries,
            }),
        });
    },

    RECEIVE_NURSERIES_ERROR: (state, action) => {
        return merge(state, {
            isLoading: false,
            data: merge(state.data, {
                nurseries: []
            }),
            errors: action.errors,
        });
    },

    REQUEST_NURSERY: (state, action) => {
        return merge(state,{
            isLoading: true,
        });
    },

    RECEIVE_NURSERY_SUCCESS: (state, action) => {
        console.log(state);
        return merge(state, {
            isLoading: false,
            data: merge(state.data, {
                nursery: action.nursery,
            }),
        });
    },

    RECEIVE_NURSERY_ERROR: (state, action) => {
        return merge(state, {
            isLoading: false,
            data: merge(state.data, {
                nursery: {},
            }),
            errors: action.errors,
        });
    },
};

export default (state = initial, action) => ReducerHelper(state, action, actions);
