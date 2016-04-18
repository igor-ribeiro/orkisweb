
'use strict';

import React from 'react';

import Container from '../container';

export default (props) => {
    return (
        <Container className="form-container">
            {props.children}
            <hr />
        </Container>
    );
};
