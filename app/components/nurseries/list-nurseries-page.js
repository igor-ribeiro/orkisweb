'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchNurseries } from '../../actions/nurseries-actions';
import AppStore from '../../stores/app-store';
import { merge } from '../../helpers/helpers';

import LoadableContent from '../common/loadable-content';
import NurseriesTable from './nurseries-table';
import Header from '../common/header';
import Container from '../common/container';

export class ListNurseriesPage extends React.Component {
    render = () => {
        return (
            <div>
                <Header>Meus Orquidários</Header>

                <Container spaced={true}>
                    <Link to="/orquidarios/cadastrar" className="btn btn-primary">Cadastrar</Link>

                    <LoadableContent isLoading={this.props.nurseries.isLoading}>
                        {this.renderNurseries()}
                    </LoadableContent>
                </Container>
            </div>
        );
    }

    componentDidMount = () => {
        if (! this.props.username) {
            return;
        }

        AppStore.dispatch(
            fetchNurseries(this.props.username)
        );
    }
    
    renderNurseries = () => {
        const nurseries = this.props.nurseries.data.nurseries || [];

        if (nurseries.length <= 0 && ! this.props.nurseries.isLoading) {
            return (
                <div>
                    <hr />
                    <p>Você ainda não possui orquidários.</p>
                </div>
            );
        }

        return <NurseriesTable nurseries={nurseries}/>;
    }
};

const mapStateToProps = (state) => {
    return merge(state, {});
};

export const ListNurseriesContainer = connect(mapStateToProps)(ListNurseriesPage);
