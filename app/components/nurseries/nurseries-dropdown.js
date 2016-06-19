'use strict';

import React from 'react';
import { Link } from 'react-router';

export default (props) => {
    return (
        <div className="dropdown-menu">
            {props.nurseries.map((nursery) => {
                return renderNurseriesOptions(nursery, props.orchidHash, props.handleAddToNursery);
            })}
        </div>
    );
}

const renderNurseriesOptions = (nursery, orchidHash, handleSelect) => {
    return <button onClick={handleSelect.bind(null, nursery.document, orchidHash)} className="dropdown-item" key={nursery.document}>{nursery.name}</button>
}