'use strict';

import React from 'react';

import Container from './container';

export default (props) => {
    return (
        <div className={`alert alert-${props.type || 'info'}`}>
            <Container>
                {props.children}
                
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

            </Container>
        </div>
    );
};
