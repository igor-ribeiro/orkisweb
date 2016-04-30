'use strict';

import React from 'react';
import { Link } from 'react-router';

export default (props) => {
    const { orchids, pagination } = props;

    const renderRows = (orchid, index) => {
        const id = pagination.from + index;

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
