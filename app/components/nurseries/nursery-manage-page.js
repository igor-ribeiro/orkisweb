'use strict';

import React from 'react';
import { connect } from 'react-redux';
import parseForm from 'parse-form';

import { merge } from '../../helpers/helpers';
import {
    initial,
    fetchNursery,
    updateNursery,
    registerNursery,
} from '../../actions/nurseries-actions';
import { updateForm } from '../../actions/forms-actions';
import Auth from '../../helpers/auth';

import Header from '../common/header';
import Container from '../common/container';
import FormContainer from '../common/form/form-container';
import NurseryForm from './nursery-form';
import LoadableContent from '../common/loadable-content';

export class NurseryManagePage extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object,
        router: React.PropTypes.object,
    }

    render = () => {
        const action = this.isEditing()
            ? 'Atualizar'
            : 'Cadastrar';

        return (
            <div>
                <Header>{action} Orquidário</Header>

                <Container>
                    <FormContainer>
                        <LoadableContent isLoading={this.props.nurseries.isLoading}>
                            {this.renderForm(action)}
                        </LoadableContent>
                    </FormContainer>
                </Container>
            </div>
        );
    }

    componentDidMount = () => {
        if (this.props.params.document) {
            if (!! this.props.nurseries.data.nursery) {
                this.context.store.dispatch(
                    fetchNursery(this.props.params.document)
                ).then((nursery) => {
                    this.context.store.dispatch(updateForm({ nursery }));
                });
            } else {
                this.context.store.dispatch(updateForm({ nursery: this.props.nurseries.data.nursery }));
            }
        }
    }

    componentWillReceiveProps = (next) => {
        const currentDocument = this.props.params.document;
        const nextDocument = next.params.document;

        if (currentDocument !== nextDocument && ! this.props.nurseries.isLoading) {
            this.context.store.dispatch(fetchNursery(document));
        }
    }

    componentWillUnmount = () => {
        this.context.store.dispatch(initial());
        this.context.store.dispatch(updateForm({ nursery: {} }));
    }

    hasNursery = () => {
        return Object.keys(this.props.nurseries.data.nursery).length > 0 || Object.keys(this.props.forms.nursery).length > 0;
    }

    renderForm = (action) => {
        const nursery = this.props.forms.nursery;

        return (
            <NurseryForm
                button={action}
                nursery={nursery}
                errors={this.props.nurseries.errors}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                />
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const nursery = this.props.forms.nursery;
        const nurseryDocument = this.props.params.document;

        const updateOrRegister = () => {
            return this.isEditing()
                ? updateNursery(nurseryDocument, nursery)
                : registerNursery(Auth.user().username, nursery);
        }

        this.context.store.dispatch(updateOrRegister())
            .then(() => this.context.router.push('/'))
            .catch(() => {});

    }

    handleChange = (event) => {
        const nursery = parseForm(event.target.form).body;

        this.context.store.dispatch(updateForm({ nursery }));
    }

    isEditing = () => {
        return !! this.props.params.document;
    }
};

const mapStateToProps = (state) => {
    return merge(state, {});
};

export const NurseryManageContainer = connect(mapStateToProps)(NurseryManagePage);
