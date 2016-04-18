'use strict';

import API from '../helpers/api';

export const INITIAL = 'INITIAL';
export const REQUEST_NURSERIES = 'REQUEST_NURSERIES';
export const RECEIVE_NURSERIES_SUCCESS = 'RECEIVE_NURSERIES_SUCCESS';
export const RECEIVE_NURSERIES_ERROR = 'RECEIVE_NURSERIES_ERROR';
export const REQUEST_NURSERY = 'REQUEST_NURSERY';
export const RECEIVE_NURSERY_SUCCESS = 'RECEIVE_NURSERY_SUCCESS';
export const RECEIVE_NURSERY_ERROR = 'RECEIVE_NURSERY_ERROR';

// --- ACTIONS

export const initial = () => {
    return {
        type: INITIAL,
    };
};

export const fetchNurseries = (username) => {
    return (dispatch) => {
        dispatch(
            requestNurseries()
        );

        return API.get(`users/${username}/nurseries`)
            .then((response) => {
                const nurseries = response.data.data;

                dispatch(
                    receiveNurseriesSuccess(nurseries)
                );

                return Promise.resolve(nurseries);
            })
            .catch((response) => {
                const errors = response.errors;

                dispatch(
                    receiveNurseriesError(errors)
                );

                return Promise.reject(errors);
            });
    };
};

export const fetchNursery = (document) => {
    return (dispatch) => {
        dispatch(
            requestNursery()
        );

        return API.get(`nurseries/${document}`)
            .then((response) => {
                const nursery = response.data;

                dispatch(
                    receiveNurserySuccess(nursery)
                );

                return Promise.resolve(nursery);
            })
            .catch((response) => {
                const errors = response.errors;

                dispatch(
                    receiveNurseryError(errors)
                );

                return Promise.reject(errors);
            });
    };
};

export const requestNurseries = () => {
    return {
        type: REQUEST_NURSERIES,
    };
};

export const receiveNurseriesSuccess = (nurseries) => {
    return {
        type: RECEIVE_NURSERIES_SUCCESS,
        nurseries,
    };
};

export const receiveNurseriesError = (errors) => {
    return {
        type: RECEIVE_NURSERIES_ERROR,
        errors,
    };
};

export const requestNursery = () => {
    return {
        type: REQUEST_NURSERY,
    };
};

export const receiveNurserySuccess = (nursery) => {
    return {
        type: RECEIVE_NURSERY_SUCCESS,
        nursery,
    };
};

export const receiveNurseryError = (errors) => {
    return {
        type: RECEIVE_NURSERY_ERROR,
        errors,
    };
};
