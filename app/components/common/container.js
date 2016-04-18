'use strict';

import React from 'react';

export default (props) => {
    return (
        <div className={`container ${props.spaced ? 'spaced' : ''} ${props.className || ''}`}>
            {props.children}
        </div>
    );
}
