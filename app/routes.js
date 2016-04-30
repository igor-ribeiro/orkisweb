'use strict';

import React from 'react';
import {
    Router,
    Route,
    Link,
    IndexRoute,
} from 'react-router';
import { Provider } from 'react-redux';

import AppHistory from './app-history';
import Auth from './helpers/auth';
import AppStore from './stores/app-store';

import App from './components/app';
import HomePage from './components/home/home-page';
import PageHandler from './components/common/page-handler';

// Users
import { LoginContainer } from './components/login/login-page';
import Logout from './components/login/logout';
import { RegisterContainer } from './components/register/register-page';
import { UserProfileContainer } from './components/users/user-profile-page';

// Nurseries
import { ListNurseriesContainer } from './components/nurseries/list-nurseries-page';
import { NurseryManageContainer } from './components/nurseries/nursery-manage-page';

// Orchids
import { ListOrchidsContainer } from './components/orchids/list-orchids-page';

// Errors
import NotFoundPage from './components/errors/not-found-page';

export default () => {
    return (
        <Provider store={AppStore}>
            <Router history={AppHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={HomePage} onEnter={Auth.loggedIn}/>

                    <Route path='/perfil' component={UserProfileContainer} onEnter={Auth.loggedIn}/>

                    <Route path='/orquidarios' component={PageHandler} onEnter={Auth.loggedIn}>
                        <IndexRoute component={ListNurseriesContainer}/>

                        <Route path='cadastrar' component={NurseryManageContainer}/>

                        <Route path=':document/editar' component={NurseryManageContainer}/>
                    </Route>

                    <Route path='/acessar' component={LoginContainer} onEnter={Auth.loggedOut}/>
                    <Route path='/cadastrar' component={RegisterContainer} onEnter={Auth.loggedOut}/>
                    <Route path='/sair' component={Logout} onEnter={Auth.LoggedIn}/>

                    <Route path='/orquideas' component={PageHandler} onEnter={Auth.loggedIn}>
                        <IndexRoute component={ListOrchidsContainer}/>
                    </Route>

                    <Route path='*' component={NotFoundPage}/>
                </Route>
            </Router>
        </Provider>
    );
}
