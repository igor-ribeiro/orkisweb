'use strict';

import React from 'react';

export default (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.children}
            <hr />
        </div>
    );
} 
