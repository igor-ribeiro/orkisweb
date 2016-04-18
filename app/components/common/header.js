'use strict';

import React from 'react';

import Container from './container';

export default (props) => {
    return (
        <div className="jumbotron">
            <Container>
                <h1>{props.children}</h1>
            </Container>
        </div>
    );
};
