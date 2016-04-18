'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import parseForm from 'parse-form';
import Cookies from 'js-cookie';

import { merge } from '../../helpers/helpers';
import FormHelper from '../../helpers/form-helper';
import Auth from '../../helpers/auth';
import AppHistory from '../../app-history';
import AppStore from '../../stores/app-store';
import { initialState } from '../../actions/users-actions';
import { updateForm } from '../../actions/forms-actions';

import Page from '../common/page';
import FormPage from '../common/form/form-page';
import FormContainer from '../common/form/form-container';
import SimpleHeader from '../common/simple-header';
import LoginForm from './login-form';
import LoadableContent from '../common/loadable-content';

export class LoginPage extends React.Component {
    render = () => {
        return (
            <Page hideNav={true}>
                <FormContainer>
                    <LoadableContent isLoading={this.props.users.isLoading}>
                        <SimpleHeader title="Acessar">
                            Se você não possui cadastro, <Link to="/cadastrar">cadastre-se aqui</Link>.
                        </SimpleHeader>
                        
                        <LoginForm
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            errors={this.props.users.errors}
                            credentials={this.props.forms.credentials}
                            />
                    </LoadableContent>
                </FormContainer>
            </Page>
        );
    }

    componentDidMount = () => {
        if (Cookies.get('user')) {
            return;
        }

        AppStore.dispatch(
            initialState()
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const credentials = this.props.forms.credentials;

        Auth.login(credentials)
            .then(() => {
                AppHistory.push('/');
            });
    }

    handleChange = (event) => {
        const credentials = parseForm(event.target.form).body;

        AppStore.dispatch(
            updateForm({ credentials })
        );
    }
};

const mapStateToProps = (state) => {
    const newState = merge(state, {});

    if (Auth.hasUser()) {
        newState.forms.credentials = merge(state.forms.credentials, {
            username: Auth.user().username,
        });
    }

    return newState;
};

export const LoginContainer = connect(mapStateToProps)(LoginPage);
