'use strict';

import { merge } from '../helpers/helpers';
import {
    UPDATE_FORM,
    CLEAR_FORM
} from '../actions/forms-actions';

const initial = {
    user: {},
    nursery: {},
    credentials: {},
};

export default (state = initial, action) => {
    switch (action.type) {
        case UPDATE_FORM:
            return merge(state, action.data);
        break;

        case CLEAR_FORM:
            const newState = merge(state, {});

            newState[action.key] = initial[action.key];

            return newState;
        break;

        default:
            return state;
        break;
    }
};
