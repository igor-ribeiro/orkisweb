'use strict';

import React from 'react';

export default (props) => {
    return (
        <input
            type={props.type || 'button'}
            className={`btn btn-${props.style || 'default'} ${props.isLoading ? 'is-loading' : ''}`}
            onClick={props.onClick}
            value={props.value}
            />
    );
};
