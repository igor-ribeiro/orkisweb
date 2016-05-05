'use strict';

import API from '../helpers/api';

export const REQUEST_ORCHIDS = 'REQUEST_ORCHIDS';
export const RECEIVE_ORCHIDS_SUCCESS = 'RECEIVE_ORCHIDS_SUCCESS';
export const RECEIVE_ORCHIDS_ERROR = 'RECEIVE_ORCHIDS_ERROR';

export const REQUEST_LOAD_ORCHIDS = 'REQUEST_LOAD_ORCHIDS';
export const RECEIVE_LOAD_ORCHIDS_SUCCESS = 'RECEIVE_LOAD_ORCHIDS_SUCCESS';
export const RECEIVE_LOAD_ORCHIDS_ERROR = 'RECEIVE_LOAD_ORCHIDS_ERROR';

export const REQUEST_ORCHID = 'REQUEST_ORCHID';
export const RECEIVE_ORCHID_SUCCESS = 'RECEIVE_ORCHID_SUCCESS';
export const RECEIVE_ORCHID_ERROR = 'RECEIVE_ORCHID_ERROR';

export const loadOrchids = (next) => {
    return (dispatch) => {
        if (next == false) {
            return false;
        }

        dispatch(requestLoadOrchids());

        return API.get(`orchids?page=${next}`)
            .then((response) => {
                const orchids = response.data.data;
                const next = (response.data.currentPage == response.data.lastPage)
                    ? false
                    : response.data.currentPage + 1;

                dispatch(receiveLoadOrchidsSuccess(orchids, next));
            });
    }
};

export const requestLoadOrchids = () => {
    return {
        type: REQUEST_LOAD_ORCHIDS,
    };
};

export const receiveLoadOrchidsSuccess = (orchids, next) => {
    return {
        type: RECEIVE_LOAD_ORCHIDS_SUCCESS,
        orchids,
        next,
    };
};

export const receiveLoadOrchidsError = (errors) => {
    return {
        type: RECEIVE_LOAD_ORCHIDS_ERROR,
        errors,
    };
};

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

export const fetchOrchid = (hash) => {
    return (dispatch) => {
        dispatch(requestOrchid());

        return API.get(`orchids/${hash}`)
            .then((response) => {
                const orchid = response.data;

                dispatch(receiveOrchidSuccess(orchid));

                return Promise.resolve(orchid);
            })
            .catch((response) => {
                const { errors } = response;

                dispatch(receiveOrchidError(errors));

                return Promise.reject(errors);
            });
    };
};

export const requestOrchid = () => {
    return {
        type: REQUEST_ORCHID,
    };
};

export const receiveOrchidSuccess = (orchid) => {
    return {
        type: RECEIVE_ORCHID_SUCCESS,
        orchid,
    };
};

export const receiveOrchidError = (errors) => {
    return {
        type: RECEIVE_ORCHID_ERROR,
        errors,
    };
};
