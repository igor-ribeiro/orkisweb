'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { merge } from '../../helpers/helpers';
import AppStore from '../../stores/app-store';
import {
    initial,
    fetchNursery
} from '../../actions/nurseries-actions';

import Header from '../common/header';
import Container from '../common/container';
import FormContainer from '../common/form/form-container';
import NurseryForm from './nursery-form';
import LoadableContent from '../common/loadable-content';

export class NurseryManagePage extends React.Component {
    render = () => {
        const action = this.props.params.document
            ? 'Atualizar'
            : 'Cadastrar';

        const isLoading = this.props.nurseries.isLoading;
    
        return (
            <div>
                <Header>{action} Orquidário</Header>

                <Container>
                    <FormContainer>
                        <LoadableContent isLoading={isLoading}>
                            {this.renderForm(action)}
                        </LoadableContent>
                    </FormContainer>
                </Container>
            </div>
        );
    }

    componentWillMount = () => {
        return false;
    }

    componentDidMount = () => {
        const document = this.props.params.document;

        if (this.shouldHaveNursery()) {
            if (! this.hasNursery()) {
                AppStore.dispatch(
                    fetchNursery(document)
                );
            }
        }
    }

    componentWillReceiveProps = (next) => {
        const document = next.params.document;

        if (document) {
            if (! this.props.nurseries.isLoading && ! this.hasNursery()) {
                AppStore.dispatch(
                    fetchNursery(document)
                );
            }
        } else {
            AppStore.dispatch(
                initial()
            );
        }
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

        const nursery = this.props.nurseries.data.nursery;

        return (
            <NurseryForm
                button={action}
                nursery={nursery}
                />
        ); 
    }
};

const mapStateToProps = (state) => {
    return merge(state, {});
};

export const NurseryManageContainer = connect(mapStateToProps)(NurseryManagePage);
