'use strict';

import { merge } from '../helpers/helpers';

import {
    REQUEST_ORCHIDS,
    RECEIVE_ORCHIDS_SUCCESS,
    RECEIVE_ORCHIDS_ERROR,
} from '../actions/orchids-actions';

const initial = {
    isLoading: false,
    data: {},
    errors: {},
};

export default (state = initial, action) => {
    switch (action.type) {
        case REQUEST_ORCHIDS:
            return merge(state, {
                isLoading: true,
            });
        break;

        case RECEIVE_ORCHIDS_SUCCESS:
            return merge(state, {
                isLoading: false,
                data: merge(state.data, {
                    orchids: action.orchids
                }),
            });
        break;

        case RECEIVE_ORCHIDS_ERROR:
            return merge(state, {
                isLoading: false,
                errors: action.errors,
            });
        break;

        default:
            return state;
    }
}
