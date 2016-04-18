'use strict';

import React from 'react';

export default (props) => {
    return (
        <div className={`loadable ${props.isLoading ? 'is-loading' : ''}`}>
            <div className="loadable-child">{props.children}</div>
        </div>
    );
};
