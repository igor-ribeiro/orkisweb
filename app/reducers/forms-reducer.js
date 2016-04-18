'use strict';

import { merge } from '../helpers/helpers';
import ReducerHelper from './reducer-helper';
import { UPDATE_FORM } from '../actions/forms-actions';

const initial = {
};

const actions = {
    UPDATE_FORM: (state, action) => {
        return merge(state, action.data);
    },
};

export default (state = initial, action) => ReducerHelper(state, action, actions);
