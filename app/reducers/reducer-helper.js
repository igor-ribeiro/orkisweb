'use strict';

export default (state, action, actions) => {
    return Object.keys(actions).indexOf(action.type) >= 0
        ? actions[action.type](state, action)
        : state;
}
