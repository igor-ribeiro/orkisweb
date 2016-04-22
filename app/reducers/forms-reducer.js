'use strict';

import { merge } from '../helpers/helpers';
import ReducerHelper from './reducer-helper';
import {
    UPDATE_FORM,
    CLEAR_FORM
} from '../actions/forms-actions';

const initial = {
    user: {},
    nursery: {},
    credentials: {},
};

const actions = {
    UPDATE_FORM: (state, action) => {
        return merge(state, action.data);
    },

    CLEAR_FORM: (state, action) => {
        const newState = merge(state, {});

        newState[action.key] = initial[action.key];

        return newState;
    },
};

export default (state = initial, action) => ReducerHelper(state, action, actions);
