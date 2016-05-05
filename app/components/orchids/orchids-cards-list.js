'use strict';

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

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
                <h5 className="card-block-title">{orchid.name}</h5>
            </div>

            <div className="card-img" style={{backgroundImage: 'url(http://www.aos.org/AOS/media/Content-Images/Orchids/orchid-care-phal.jpg)'}}></div>

            <div className="card-block">
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div className="text-right">
                    <Link to={`/orquideas/${orchid.hash}`} className="card-link">Detalhes</Link>
                    <a href="#/orquideas" className="card-link dropdown-toggle">Adicionar</a>
                </div>
            </div>
        </div>
    );
}
