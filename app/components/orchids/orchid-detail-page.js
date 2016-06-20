'use strict';

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Auth from '../../helpers/auth';
import { merge, renderJSONStringToHTML } from '../../helpers/helpers';
import { fetchOrchid, receiveOrchidSuccess, requestOrchid, receiveOrchidsSuccess } from '../../actions/orchids-actions';
import { addOrchid, fetchNurseriesAvailableToOrchid } from '../../actions/nurseries-actions';

import Container from '../common/container';
import LoadableContent from '../common/loadable-content';
import Header from '../common/header';
import NurseriesDropdown from '../nurseries/nurseries-dropdown';

export default class OrchidDetailPage extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object,
    }

    render = () => {
        const { isLoading, data } = this.props.orchids;

        return (
            <div>
                <LoadableContent isLoading={isLoading}>
                    <div className="orchid-detail-image" style={{ backgroundImage: `url('${data.orchid.image || ''}')` }}>
                        <div className="orchid-detail-image-top">
                            <Container>
                                <h1>{data.orchid.name || data.orchid.scientificName}</h1>
                            </Container>
                        </div>

                        <div className="orchid-detail-image-bottom">
                            <Container>
                                <h5>
                                    <strong>Nome Científico:</strong>{' '}
                                    {data.orchid.scientificName}
                                </h5>
                                <h5>
                                    <strong>Origem:</strong>{' '}
                                    {data.orchid.origin}
                                </h5>
                            </Container>
                        </div>
                    </div>

                    <Container spaced={true}>
                        <div className="btn-group">
                            {this.renderNurseriesOptions()}
                        </div>

                        <hr/>

                        <h2>Descrição:</h2>
                        <div>{renderJSONStringToHTML(data.orchid.description)}</div>

                        <h2>Instruções:</h2>
                        <div>{renderJSONStringToHTML(data.orchid.instructions)}</div>

                        {this.renderCodes()}
                    </Container>
                </LoadableContent>
            </div>
        );
    }

    componentDidMount = () => {
        const { orchids } = this.props.orchids.data;
        const { hash } = this.props.params;
        const orchidLocalIndex = _.findIndex(orchids, { hash });
        let orchid;

        if (orchids && orchidLocalIndex >= 0) {
            orchid = orchids[orchidLocalIndex];

            this.context.store.dispatch(receiveOrchidSuccess(orchid));
        } else {
            this.context.store.dispatch(fetchOrchid(hash));
        }

        this.context.store.dispatch(fetchNurseriesAvailableToOrchid(Auth.user().username, hash));
    }

    renderNurseriesOptions = () => {
        if (! this.props.nurseries.data.nurseries.length) {
            return <span>Em todos seus orquidários</span>;
        }

        return (
            <LoadableContent isLoading={this.props.nurseries.isLoading}>
                <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Adicionar</button>

                <NurseriesDropdown orchidHash={this.props.orchids.data.orchid.hash} nurseries={this.props.nurseries.data.nurseries} handleAddToNursery={this.handleAddToNursery}/>
            </LoadableContent>
        );
    }

    handleAddToNursery = (nurseryDocument, orchidHash) => {
        const dispatch = this.context.store.dispatch;

        dispatch(requestOrchid());

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

        dispatch(fetchNurseriesAvailableToOrchid(Auth.user().username, orchidHash));
    }

    renderCodes = () => {
        const { orchid } = this.props.orchids.data;

        if (this.props.orchids.isLoading || ! orchid.nurseries) {
            return null;
        }

        if (! orchid.nurseries.length) {
            return null;
        }

        return (
            <div>
                <h2>Códigos</h2>
                {orchid.nurseries.map((nursery) => {
                    const file = `${nursery.document}/${orchid.hash}.png`;
                    const url = `http://api.orkis.info/codes/${file}`;

                    return (
                        <div className="orchid-detail-code" key={nursery.document}>
                            <a href={url} target="_blank"><img src={url}/></a>
                            <h6>{nursery.name}</h6>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return merge(state, {});
}

export const OrchidDetailContainer = connect(mapStateToProps)(OrchidDetailPage);
