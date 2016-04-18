'use strict';

import { combineReducers } from 'redux';

import users from './users-reducer';
import nurseries from './nurseries-reducer';
import forms from './forms-reducer';

export default combineReducers({
    users,
    nurseries,
    forms,
});
