'use strict';

import API from '../helpers/api';

export const REQUEST_ORCHIDS = 'REQUEST_ORCHIDS';
export const RECEIVE_ORCHIDS_SUCCESS = 'RECEIVE_ORCHIDS_SUCCESS';
export const RECEIVE_ORCHIDS_ERROR = 'RECEIVE_ORCHIDS_ERROR';

export const fetchOrchids = ()  => {
    return (dispatch) => {
        dispatch(requestOrchids());

        return API.get('orchids')
            .then((response) => {
                const orchids = response.data.data;

                dispatch(receiveOrchidsSuccess(orchids));

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

export const receiveOrchidsSuccess = (orchids) => {
    return {
        type: RECEIVE_ORCHIDS_SUCCESS,
        orchids,
    };
};

export const receiveOrchidsError = (errors) => {
    return {
        type: RECEIVE_ORCHIDS_ERROR,
        errors,
    };
};
