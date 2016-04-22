'use strict';

import React from 'react';
import LocalStorage from 'humble-localstorage';

import Container from './container';

export default (props) => {
    const regex = new RegExp(`^${props.scope.replace('\*', '.')}$`);

    if (! regex.test(props.url)) {
        return <span></span>;
    }

    LocalStorage.removeItem('alert');

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
