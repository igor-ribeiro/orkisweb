'use strict';

import React from 'react';
import { connect } from 'react-redux';
import parseForm from 'parse-form';

import { merge } from '../../helpers/helpers';
import {
    initial,
    fetchNursery,
    updateNursery,
} from '../../actions/nurseries-actions';
import { updateForm } from '../../actions/forms-actions';

import Header from '../common/header';
import Container from '../common/container';
import FormContainer from '../common/form/form-container';
import NurseryForm from './nursery-form';
import LoadableContent from '../common/loadable-content';

export class NurseryManagePage extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object,
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
        if (this.shouldHaveNursery()) {
            if (! this.hasNursery()) {
                this.context.store.dispatch(
                    fetchNursery(this.props.params.document)
                ).then((nursery) => {
                    this.context.store.dispatch(updateForm({ nursery }));
                });
            }
        }
    }

    componentWillReceiveProps = (next) => {
        const document = next.params.document;

        if (document) {
            if (! this.props.nurseries.isLoading && ! this.hasNursery()) {
                this.context.store.dispatch(fetchNursery(document));
            }
        } else {
            this.context.store.dispatch(initial());
        }
    }

    componentWillUnmount = () => {
        this.context.store.dispatch(updateForm({ nursery: {} }));
    }

    shouldHaveNursery = () => {
        return !! this.props.params.document;
    }

    hasNursery = () => {
        return Object.keys(this.props.nurseries.data.nursery).length > 0;
    }

    renderForm = (action) => {
        if (this.shouldHaveNursery() && ! this.hasNursery()) {
            return <div></div>;
        }

        const nursery = this.props.forms.nursery;

        return (
            <NurseryForm
                button={action}
                nursery={nursery}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                />
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const nursery = this.props.forms.nursery;
        const nurseryDocument = this.props.params.document;

        this.context.store.dispatch(updateNursery(nurseryDocument, nursery));
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
