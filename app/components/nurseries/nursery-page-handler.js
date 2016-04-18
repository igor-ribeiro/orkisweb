'use strict';

import React from 'react';

import Page from '../common/page';
import Container from '../common/container';

export default (props) => {
    return (
        <Page>
            {props.children}
        </Page>
    );
};
