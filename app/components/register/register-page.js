'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import parseForm from 'parse-form';
import Humps from 'humps';
import LocalStorage from 'humble-localstorage';

import AppStore from '../../stores/app-store';
import FormHelper from '../../helpers/form-helper';
import AppHistory from '../../app-history';
import { merge } from '../../helpers/helpers';
import {
    registerUser,
    initialState
} from '../../actions/users-actions';
import { updateForm } from '../../actions/forms-actions'; 

import Page from '../common/page';
import FormContainer from '../common/form/form-container';
import UserForm from '../users/user-form';
import SimpleHeader from '../common/simple-header';
import LoadableContent from '../common/loadable-content';

export class RegisterPage extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    render = () => {
        return (
            <Page hideNav={true}>
                <FormContainer>
                    <LoadableContent isLoading={this.props.users.isLoading}>
                        <SimpleHeader title="Cadastrar">
                            Se você já possui cadastro, <Link to="/acessar">acesse aqui</Link>.
                        </SimpleHeader>

                        <UserForm
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            errors={this.props.users.errors}
                            user={this.props.forms.user}
                            button='Cadastrar'
                            />
                    </LoadableContent>
                </FormContainer>
            </Page>
        );
    }

    componentDidMount = () => {
        AppStore.dispatch(initialState());
    }

    handleSubmit = (event) => {
        event.preventDefault();
     
        const user = Humps.decamelizeKeys(this.props.forms.user);

        AppStore
            .dispatch(registerUser(user))
            .then(() => this.context.router.push('/acessar'))
            .catch(() => this.context.router.push('/cadastrar'));
    }

    handleChange = (event) => {
        const user = parseForm(event.target.form).body;
        
        AppStore.dispatch(
            updateForm({ user })
        );
    }
};

const mapStateToProps = (state) => {
    return merge(state, {});
};

export const RegisterContainer = connect(mapStateToProps)(RegisterPage);
