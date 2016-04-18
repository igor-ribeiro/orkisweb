'use strict';

import React from 'react';

export default (props) => {
    return (
        <input
            id={props.id}
            type={props.type || 'text'}
            className="form-control"
            onChange={props.onChange}
            name={props.id}
            value={props.value || ''}
            autoComplete={props.autocomplete || 'off'}
            />
    );
}
