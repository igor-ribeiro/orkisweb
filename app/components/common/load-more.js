'use strict';

import React from 'react';
import LoadableContent from './loadable-content';

export default (props) => {
    if (! props.isVisible) {
        return <div></div>;
    }

    return (
        <LoadableContent isLoading={props.isLoading}>
            <button className="btn btn-default btn-block" onClick={props.handleLoadMore}>Mostrar mais</button>
        </LoadableContent>
    );
};
