'use strict';

import React from 'react';

import Page from './page';
import Container from './container';

export default (props) => {
    return (
        <Page>
            {props.children}
        </Page>
    );
};
