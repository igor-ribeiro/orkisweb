'use strict';

import API from '../helpers/api';

export const REQUEST_ORCHIDS = 'REQUEST_ORCHIDS';
export const RECEIVE_ORCHIDS_SUCCESS = 'RECEIVE_ORCHIDS_SUCCESS';
export const RECEIVE_ORCHIDS_ERROR = 'RECEIVE_ORCHIDS_ERROR';

export const fetchOrchids = (page = 1)  => {
    return (dispatch) => {
        dispatch(requestOrchids());

        return API.get(`orchids?page=${page}`)
            .then((response) => {
                const orchids = response.data.data;

                const pagination = {
                    total: response.data.total,
                    from: response.data.from,
                    to: response.data.to,
                    perPage: response.data.perPage,
                    lastPage: response.data.lastPage,
                };

                dispatch(receiveOrchidsSuccess(orchids, pagination));

                return Promise.resolve(orchids);
            })
            .catch((response) => {
                dispatch(receiveOrchidsError(response.errors));

                return Promise.resolve(response.errors);
            });
    };
};

export const requestOrchids = () => {
    return {
        type: REQUEST_ORCHIDS,
    };
};

export const receiveOrchidsSuccess = (orchids, pagination) => {
    return {
        type: RECEIVE_ORCHIDS_SUCCESS,
        orchids,
        pagination,
    };
};

export const receiveOrchidsError = (errors) => {
    return {
        type: RECEIVE_ORCHIDS_ERROR,
        errors,
    };
};
