'use strict';

import React from 'react';
import { Link } from 'react-router';

export default (props) => {
    const { orchids } = props;

    const renderRows = (orchid, index) => {
        const id = index + 1;

        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{orchid.name}</td>
                <td><Link to="/orquideas">Detalhes</Link></td>
            </tr>
        );
    };

    return <tbody>{orchids.map(renderRows)}</tbody>;
};
