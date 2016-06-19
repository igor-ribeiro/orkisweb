'use strict';

import API from '../helpers/api';
import Cookies from 'js-cookie';
import Auth from '../helpers/auth';

export const INITIAL = 'INITIAL';

export const REQUEST_NURSERIES = 'REQUEST_NURSERIES';
export const RECEIVE_NURSERIES_SUCCESS = 'RECEIVE_NURSERIES_SUCCESS';
export const RECEIVE_NURSERIES_ERROR = 'RECEIVE_NURSERIES_ERROR';

export const REQUEST_NURSERY = 'REQUEST_NURSERY';
export const RECEIVE_NURSERY_SUCCESS = 'RECEIVE_NURSERY_SUCCESS';
export const RECEIVE_NURSERY_ERROR = 'RECEIVE_NURSERY_ERROR';

export const REQUEST_REGISTER_NURSERY = 'REQUEST_REGISTER_NURSERY';
export const RECEIVE_REGISTER_NURSERY_SUCCESS = 'RECEIVE_REGISTER_NURSERY_SUCCESS';
export const RECEIVE_REGISTER_NURSERY_ERROR = 'RECEIVE_REGISTER_NURSERY_ERROR';

export const REQUEST_UPDATE_NURSERY = 'REQUEST_UPDATE_NURSERY';
export const RECEIVE_UPDATE_NURSERY_SUCCESS = 'RECEIVE_UPDATE_NURSERY_SUCCESS';
export const RECEIVE_UPDATE_NURSERY_ERROR = 'RECEIVE_UPDATE_NURSERY_ERROR';

export const REQUEST_ADD_ORCHID = 'REQUEST_ADD_ORCHID';
export const RECEIVE_ADD_ORCHID_SUCCESS = 'RECEIVE_ADD_ORCHID_SUCCESS';
export const RECEIVE_ADD_ORCHID_ERROR = 'RECEIVE_ADD_ORCHID_ERROR';

export const REQUEST_NURSERIES_AVAILABLE_TO_ORCHID = 'REQUEST_NURSERIES_AVAILABLE_TO_ORCHID';
export const RECEIVE_NURSERIES_AVAILABLE_TO_ORCHID_SUCCESS = 'RECEIVE_NURSERIES_AVAILABLE_TO_ORCHID_SUCCESS';
export const RECEIVE_NURSERIES_AVAILABLE_TO_ORCHID_ERROR = 'RECEIVE_NURSERIES_AVAILABLE_TO_ORCHID_ERROR';

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

export const registerNursery = (username, data) => {
    return (dispatch) => {
        dispatch(requestRegisterNursery());

        return API.post(`nurseries`, { username, ...data })
            .then((response) => {
                dispatch(receiveNurserySuccess(response.data));
                requestNurseries(Auth.user().username);

                const user = Object.assign(Auth.user(), {
                    nurseries: Object.assign(Auth.user().nurseries.concat([response.data])),
                });

                Cookies.set('user', user);

                return Promise.resolve(response.data);
            })
            .catch((response) => {
                dispatch(receiveNurseryError(response.errors));

                return Promise.reject(response.errors);
            });
    };
};

export const requestRegisterNursery = () => {
    return {
        type: REQUEST_REGISTER_NURSERY,
    };
};

export const updateNursery = (nurseryDocument, data) => {
    return (dispatch) => {
        dispatch(requestUpdateNursery());

        return API.put(`nurseries/${nurseryDocument}`, data)
            .then((response) => {
                dispatch(receiveNurserySuccess(response.data));
                requestNurseries(Auth.user().username);

                return Promise.resolve(response.data);
            })
            .catch((response) => {
                dispatch(receiveNurseryError(response.errors));

                return Promise.reject(response.errors);
            });
    };
};

export const requestUpdateNursery = () => {
    return {
        type: REQUEST_UPDATE_NURSERY,
    };
};

export const addOrchid = (nurseryDocument, orchidHash) => {
    return (dispatch) => {
        dispatch(requestAddOrchid());

        return API.post(`nurseries/${nurseryDocument}/${orchidHash}`)
            .then((response) => {
                dispatch(receiveAddOrchidSuccess(response.data));

                return Promise.resolve(response.data);
            })
            .catch((response) => {
                dispatch(receiveAddOrchidError(response.errors));

                return Promise.reject(response.errors);
            })
    }
}

export const requestAddOrchid = () => {
    return {
        type: REQUEST_ADD_ORCHID,
    };
}

export const receiveAddOrchidSuccess = (code) => {
    return {
        type: RECEIVE_ADD_ORCHID_SUCCESS,
        code,
    };
}

export const receiveAddOrchidError = (errors) => {
    return {
        type: RECEIVE_ADD_ORCHID_ERROR,
        errors,
    };
}

export const fetchNurseriesAvailableToOrchid = (username, orchidHash) => {
    return (dispatch) => {
        dispatch(requestNurseriesAvailableToOrchid());

        return API.get(`nurseries/available-to-orchid/${username}/${orchidHash}`)
            .then((response) => {
                dispatch(receiveNurseriesAvailableToOrchidSuccess(response.data));

                return Promise.resolve(response.data);
            })
            .catch((response) => {
                dispatch(receiveNurseriesAvailableToOrchidError(response.errors));

                return Promise.reject(response.errors);
            })
    };
}

export const requestNurseriesAvailableToOrchid = () => {
    return {
        type: REQUEST_NURSERIES_AVAILABLE_TO_ORCHID,
    };
}
export const receiveNurseriesAvailableToOrchidSuccess = (nurseries) => {
    return {
        type: RECEIVE_NURSERIES_AVAILABLE_TO_ORCHID_SUCCESS,
        nurseries,
    };
}

export const receiveNurseriesAvailableToOrchidError = (errors) => {
    return {
        type: RECEIVE_NURSERIES_AVAILABLE_TO_ORCHID_ERROR,
        errors,
    };
}