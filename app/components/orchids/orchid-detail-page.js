'use strict';

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Auth from '../../helpers/auth';
import { merge, renderJSONStringToHTML } from '../../helpers/helpers';
import { fetchOrchid, receiveOrchidSuccess } from '../../actions/orchids-actions';

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
                            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Adicionar</button>

                            <NurseriesDropdown nurseries={Auth.user().nurseries}/>
                        </div>

                        <hr/>

                        <h2>Descrição:</h2>
                        <div>{renderJSONStringToHTML(data.orchid.description)}</div>

                        <h2>Instruções:</h2>
                        <div>{renderJSONStringToHTML(data.orchid.instructions)}</div>
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
    }
}

const mapStateToProps = (state) => {
    return merge(state, {});
}

export const OrchidDetailContainer = connect(mapStateToProps)(OrchidDetailPage);
