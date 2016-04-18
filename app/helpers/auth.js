'use strict';

import Cookies from 'js-cookie';
import 'babel-polyfill';

import AppStore from '../stores/app-store';
import {
    loginUser,
    initialState,
} from '../actions/users-actions';

export default class Auth {
    static check() {
        return !! Cookies.get('user') && !! Cookies.get('token');
    }

    static login(credentials) {
        return AppStore.dispatch(
                loginUser(credentials)
            )
            .then((response) => {
                Auth.logout();

                const data = AppStore.getState().users.data;
                
                Cookies.set('user', data.user);
                Cookies.set('token', data.token, { expires: 1 });

                AppStore.dispatch(
                    initialState()
                );

                return Promise.resolve();
            })
            .catch((errors) => false);
    }

    static logout() {
        Cookies.remove('user');
        Cookies.remove('token');

        return ! Cookies.get('user') && ! Cookies.get('token');
    }
    
    static loggedIn(nextState, replace) {
        if (Auth.check()) {
            return true;
        }

        replace({
            pathname: '/acessar',
            state: { nextPathname: nextState.location.pathname }
        });
    }

    static loggedOut(nextState, replace) {
        if (! Auth.check()) {
            return true;
        }

        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        });
    }

    static hasUser() {
        return !! Cookies.get('user');
    }

    static user() {
        return Auth.hasUser()
            ? Cookies.getJSON('user')
            : false
    }
}
