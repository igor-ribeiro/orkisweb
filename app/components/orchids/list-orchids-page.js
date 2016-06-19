'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { merge } from '../../helpers/helpers';
import API from '../../helpers/api';
import Auth from '../../helpers/auth';
import { loadOrchids, receiveOrchidSuccess, fetchOrchid, receiveOrchidsSuccess } from '../../actions/orchids-actions';
import { addOrchid, fetchNurseries } from '../../actions/nurseries-actions';

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
        const { nurseries } = this.props.nurseries.data;

        return (
            <div>
                <Header>Orquídeas</Header>

                <Container spaced={true}>
                    <OrchidsCardsList orchids={data.orchids || []} isLoading={isLoading} nurseries={nurseries} handleAddToNursery={this.handleAddToNursery}/>

                    <LoadMore isVisible={data.next !== false} handleLoadMore={this.handleLoadMore} isLoading={isLoading}/>
                </Container>
            </div>
        )
    }

    componentDidMount = () => {
        if (this.props.orchids.data.orchids.length) {
            return false;
        }

        this.loadOrchids();
        this.context.store.dispatch(fetchNurseries(Auth.user().username));
    }

    loadOrchids = (page) => {
        this.context.store.dispatch(loadOrchids(page || 1));
    }

    handleLoadMore = () => {
        this.loadOrchids(this.props.orchids.data.next);
    }

    handleAddToNursery = (nurseryDocument, orchidHash) => {
        const dispatch = this.context.store.dispatch;

        dispatch(addOrchid(nurseryDocument, orchidHash))
            .then(() => {
                dispatch(fetchOrchid(orchidHash))
                    .then((orchid) => {
                        const orchids = this.props.orchids.data.orchids;
                        const index = _.findIndex(orchids, [ 'hash', orchidHash ]);

                        if (index < 0) {
                            return;
                        }

                        orchids[index] = orchid;

                        dispatch(receiveOrchidsSuccess(orchids, this.props.orchids.data.next));
                    });
            });
    }
}

const mapStateToProps = (state) => {
    return merge(state, {});
}

export const ListOrchidsContainer = connect(mapStateToProps)(ListOrchidsPage);
