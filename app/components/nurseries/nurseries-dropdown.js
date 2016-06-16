'use strict';

import React from 'react';
import { Link } from 'react-router';

export default (props) => {
    return (
        <div className="dropdown-menu">
            {props.nurseries.map(renderNurseriesOptions)}
        </div>
    );
}

const renderNurseriesOptions = (nursery) => {
    return <button className="dropdown-item" key={nursery.document}>{nursery.name}</button>
}