'use strict';

import fetch from 'isomorphic-fetch';
import Humps from 'humps';
import Cookies from 'js-cookie';

import API from '../helpers/api';
import Alert from '../helpers/alert';

// --- CONSTANTS

export const INITIAL_STATE = 'INITIAL_STATE';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN_SUCCESS = 'RECEIVE_LOGIN_SUCCESS';
export const RECEIVE_LOGIN_ERROR = 'RECEIVE_LOGIN_ERROR';

export const REQUEST_REGISTER_USER = 'REQUEST_REGISTER_USER';
export const RECEIVE_REGISTER_USER_SUCCESS = 'RECEIVE_REGISTER_USER_SUCCESS';
export const RECEIVE_REGISTER_USER_ERROR = 'RECEIVE_REGISTER_USER_ERROR';

export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER';
export const RECEIVE_UPDATE_USER_SUCCESS = 'RECEIVE_UPDATE_USER_SUCCESS';
export const RECEIVE_UPDATE_USER_ERROR = 'RECEIVE_UPDATE_USER_ERROR';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';


// --- ACTIONS

export const initialState = () => {
    return {
        type: INITIAL_STATE,
    };
};

export const loginUser = (credentials) => {
    return (dispatch) => {
        dispatch(
            requestLogin()
        );

        return API.post('users/login', credentials)
            .then((response) => {
                return  dispatch(
                    receiveLoginSuccess(response.user, response.token)
                );
            })
            .catch((response) => {
                let errors = {};

                if (response.status == 404) {
                    errors.username = 'Usuário não encontrado';
                }

                if (response.status == 400) {
                    errors.password = 'Senha incorreta';
                }
                
                dispatch(
                    receiveLoginError(errors)
                );

                return Promise.reject(errors);
            });
    };
};

export const requestLogin = () => {
    return {
        type: REQUEST_LOGIN,
    };
};

export const receiveLoginSuccess = (user, token) => {
    return {
        type: RECEIVE_LOGIN_SUCCESS,
        user,
        token,
    };
};

export const receiveLoginError = (errors) => {
    return {
        type: RECEIVE_LOGIN_ERROR,
        errors,
    };
}

export const registerUser = (data) => {
    return (dispatch) => {
        dispatch(
            requestRegisterUser()
        );

        return API.post('users', data)
            .then((response) => {
                const user = response.data;

                Cookies.set('user', user);
                
                dispatch(
                    receiveRegisterUserSuccess(user)
                );
                
                Alert('success', `${user.firstName}, seu cadastro foi concluído. Seu usuário para acessar o sistema é: ${user.username}`);

                return Promise.resolve(user);
            })
            .catch((response) => {
                const errors = response.errors;

                dispatch(
                    receiveRegisterUserError(errors)
                );

                if (! response.errors) {
                    Alert('danger', 'Não foi possível concluir o seu cadastro. Tente novamente,');
                }

                return Promise.reject();
            });
    };
};

export const requestRegisterUser = () => {
    return {
        type: REQUEST_REGISTER_USER,
    };
};

export const receiveRegisterUserSuccess = (user) => {
    return {
        type: RECEIVE_REGISTER_USER_SUCCESS,
        user,
    };
};

export const receiveRegisterUserError = (errors) => {
    return {
        type: RECEIVE_REGISTER_USER_ERROR,
        errors,
    };
};

export const updateUser = (username, data) => {
    return (dispatch) => {
        dispatch(
            requestUpdateUser()
        );            

        return API.put(`users/${username}`, data)
            .then((response) => {
                const user = response.data;

                Cookies.set('user', user);
                
                dispatch(
                    receiveUpdateUserSuccess(user)
                );

                Alert('success', 'Seu perfil foi atualizado');

                return Promise.resolve(user);
            })
            .catch((response) => {
                const errors = response.errors || 'error';

                dispatch(
                    receiveUpdateUserError(errors)
                );

                Alert('danger', 'Não foi possível atualizar seu perfil. Tente novamente');

                return Promise.reject();
            });
    };
};

export const requestUpdateUser = () => {
    return {
        type: REQUEST_UPDATE_USER,
    };
};

export const receiveUpdateUserSuccess = (user) => {
    return {
        type: RECEIVE_UPDATE_USER_SUCCESS,
        user,
    };
};

export const receiveUpdateUserError = (errors) => {
    return {
        type: RECEIVE_UPDATE_USER_ERROR,
        errors,
    };
};

export const requestUsers = (data) => {
    return {
        type: REQUEST_USERS,
    };
};

export const receiveUsers = (users) => {
    return {
        type: REQUEST_USERS,
        users,
    };
};

export const requestUser = (username) => {
    return {
        type: REQUEST_USER,
        username,
    };
};

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user,
    };
};
