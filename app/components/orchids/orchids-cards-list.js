'use strict';

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import EllipsisText from 'react-ellipsis-text';

import Container from '../common/container';

export default (props) => {
    if (props.orchids.length == 0) {
        return <div></div>;
    }

    const chunks = _.chunk(props.orchids, 2);

    return (
        <Container>
            <RenderCardsChunks chunks={chunks}/>
        </Container>
    );
};

const RenderCardsChunks = (props) => {
    return (
        <div>
            {props.chunks.map((orchids, index) => {
                return <RenderCardDeck cards={orchids} key={index}/>
            })}
        </div>
    );
}

const RenderCardDeck = (props) => {
    return (
        <div className="card-deck">
           {props.cards.map((orchid, index) => {
               return <RenderCard orchid={orchid} key={index}/>
           })}
       </div>
    )
};

const RenderCard = (props) => {
    const { orchid } = props;

    return (
        <div className="card" key={orchid.hash}>
            <div className="card-block">
                <strong className="card-block-title">
                    {orchid.name || orchid.scientificName}
                </strong>
            </div>

            <div className="card-img" style={{ backgroundImage: `url('${orchid.image || ''}')` }}></div>

            <div className="card-block">
                <div className="text-right">
                    <Link to={`/orquideas/${orchid.hash}`} className="card-link">Detalhes</Link>
                    <div className="card-link btn-group">
                        <a href="#/orquideas" className="card-link dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Adicionar</a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <Link to="/perfil" className="dropdown-item">Orquidário do Igor</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
