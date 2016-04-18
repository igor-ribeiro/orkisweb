'use strict';

import React from 'react';

export default (props) => {
    return (
        <form
            onSubmit={props.onSubmit}
            action={props.action}
            className="form"
            >
            {props.children}
        </form>
    );
};
