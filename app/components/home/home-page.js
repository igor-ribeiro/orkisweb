'use strict';

import React from 'react';

import Auth from '../../helpers/auth';

import Page from '../common/page';
import { ListNurseriesContainer } from '../nurseries/list-nurseries-page';

export default (props) => {
    return (
        <Page>
            <ListNurseriesContainer />
        </Page>
    );
};
