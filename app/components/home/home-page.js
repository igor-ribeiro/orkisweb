'use strict';

import React from 'react';

import Auth from '../../helpers/auth';

import Page from '../common/page';
import { ListNurseriesContainer } from '../nurseries/list-nurseries-page';

export default (props) => {
    const nurseries = [
        'Flores Urbanas',
        'OrquiFlores',
    ];

    return (
        <Page>
            <ListNurseriesContainer username={Auth.user().username}/>
        </Page>
    );
};







