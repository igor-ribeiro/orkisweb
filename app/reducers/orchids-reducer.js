'use strict';

import { merge } from '../helpers/helpers';

import {
    REQUEST_ORCHIDS,
    RECEIVE_ORCHIDS_SUCCESS,
    RECEIVE_ORCHIDS_ERROR,

    REQUEST_LOAD_ORCHIDS,
    RECEIVE_LOAD_ORCHIDS_SUCCESS,
    RECEIVE_LOAD_ORCHIDS_ERROR,

    REQUEST_ORCHID,
    RECEIVE_ORCHID_SUCCESS,
    RECEIVE_ORCHID_ERROR,
} from '../actions/orchids-actions';

const initial = {
    isLoading: false,
    data: {},
    errors: {},
};

export default (state = initial, action) => {
    switch (action.type) {
        case REQUEST_LOAD_ORCHIDS:
            return merge(state, {
                isLoading: true,
            });
        break;

        case RECEIVE_LOAD_ORCHIDS_SUCCESS:
            const orchids = (state.data.orchids)
                ? state.data.orchids.concat(action.orchids)
                : action.orchids;

            return merge(state, {
                isLoading: false,
                data: merge(state.data, {
                    orchids: orchids,
                    next: action.next,
                }),
            });
        break;

        case RECEIVE_LOAD_ORCHIDS_ERROR:
            return merge(state, {
                isLoading: false,
                errors: action.errors,
            });
        break;

        case REQUEST_ORCHIDS:
            return merge(state, {
                isLoading: true,
            });
        break;

        case RECEIVE_ORCHIDS_SUCCESS:
            return merge(state, {
                isLoading: false,
                data: merge(state.data, {
                    orchids: action.orchids,
                    pagination: action.pagination,
                }),
            });
        break;

        case RECEIVE_ORCHIDS_ERROR:
            return merge(state, {
                isLoading: false,
                errors: action.errors,
            });
        break;

        case REQUEST_ORCHID:
            return merge(state, {
                isLoading: true,
            });
        break;

        case RECEIVE_ORCHID_SUCCESS:
            return merge(state, {
                isLoading: false,
                data: merge(state.data, {
                    orchid: action.orchid,
                }),
            });
        break;

        case RECEIVE_ORCHID_ERROR:
            return merge(state, {
                isLoading: false,
                errors: action.errors,
            });
        break;

        default:
            return state;
    }
}
