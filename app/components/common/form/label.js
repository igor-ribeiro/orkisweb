'use strict';

import React from 'react';

export default (props) => {
    return (
        <label
            className="form-control-label"
            htmlFor={props.htmlFor}
            >
            {props.children}
        </label>
    );
};
