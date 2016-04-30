'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { merge } from '../../helpers/helpers';
import API from '../../helpers/api';
import { fetchOrchids } from '../../actions/orchids-actions';

import Container from '../common/container';
import LoadableContent from '../common/loadable-content';
import OrchidsTable from './orchids-table';
import Header from '../common/header';

export default class ListOrchidsPage extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object,
    }

    render = () => {
        const { data, isLoading } = this.props.orchids;

        return (
            <div>
                <Header>Orquídeas</Header>

                <Container spaced={true}>
                    <LoadableContent isLoading={isLoading}>
                        <OrchidsTable orchids={data.orchids || []} isLoading={isLoading}/>
                    </LoadableContent>
                </Container>
            </div>
        )
    }

    componentDidMount = () => {
        this.context.store.dispatch(fetchOrchids());
    }
}

const mapStateToProps = (state) => {
    return merge(state, {});
}

export const ListOrchidsContainer = connect(mapStateToProps)(ListOrchidsPage);
