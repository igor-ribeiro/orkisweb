'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { merge } from '../../helpers/helpers';
import API from '../../helpers/api';
import { loadOrchids, receiveOrchidSuccess } from '../../actions/orchids-actions';

import Container from '../common/container';
import Header from '../common/header';
import LoadMore from '../common/load-more';
import OrchidsCardsList from './orchids-cards-list';

export default class ListOrchidsPage extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object,
        router: React.PropTypes.object,
    }
    
    render = () => {
        const { data, isLoading } = this.props.orchids;

        return (
            <div>
                <Header>Orquídeas</Header>

                <Container spaced={true}>
                    <OrchidsCardsList orchids={data.orchids || []} isLoading={isLoading}/>

                    <LoadMore isVisible={data.next !== false} handleLoadMore={this.handleLoadMore} isLoading={isLoading}/>
                </Container>
            </div>
        )
    }

    componentDidMount = () => {
        this.loadOrchids();
    }

    loadOrchids = (page) => {
        this.context.store.dispatch(loadOrchids(page || 1));
    }

    handleLoadMore = () => {
        this.loadOrchids(this.props.orchids.data.next);
    }
}

const mapStateToProps = (state) => {
    return merge(state, {});
}

export const ListOrchidsContainer = connect(mapStateToProps)(ListOrchidsPage);
