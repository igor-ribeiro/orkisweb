'use strict';

import React from 'react';
import { connect } from 'react-redux';
import parseForm from 'parse-form';

import Auth from '../../helpers/auth';
import { merge } from '../../helpers/helpers';
import { updateUser } from '../../actions/users-actions';
import AppHistory from '../../app-history';
import { updateForm } from '../../actions/forms-actions';

import LoadableContent from '../common/loadable-content';
import Page from '../common/page';
import Container from '../common/container';
import Header from '../common/header';
import UserForm from './user-form';
import FormContainer from '../common/form/form-container';

export class UserProfilePage extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
        store: React.PropTypes.object,
    }

    render = () => {
        return (
            <Page alert={this.props.alert}>
                <Header>
                    {Auth.user().name}
                    {' '}
                    <small>({Auth.user().username})</small>
                </Header>

                <FormContainer>
                    <LoadableContent isLoading={this.props.users.isLoading}>
                        <UserForm
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            user={this.props.forms.user}
                            errors={this.props.errors}
                            button='Atualizar'
                            cancel={true}
                            handleCancel={this.handleCancel}
                            />
                    </LoadableContent>
                </FormContainer>
            </Page>
        );
    }

    componentDidMount = () => {
        this.context.store.dispatch(updateForm({ user: Auth.user() }));
    }

    componentWillUnmount = () => {
        this.context.store.dispatch(updateForm({ user: {} }));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = this.props.forms.user;

        this.context.store.dispatch(updateUser(Auth.user().username, data))
            .then(() => this.context.router.goBack())
            .catch(() => this.context.router.push('/perfil'));
    }

    handleChange = (event) => {
        const user = parseForm(event.target.form).body;

        this.context.store.dispatch(
            updateForm({ user })
        );
    }

    handleCancel = (event) => {
        event.preventDefault();

        this.context.router.goBack();
    }
};

const mapStateToProps = (state) => {
   return merge(state, {});
};

export const UserProfileContainer = connect(mapStateToProps)(UserProfilePage);
