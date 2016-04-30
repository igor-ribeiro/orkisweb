'use strict';

import React from 'react';
import { Link } from 'react-router';

export default (props) => {
    if (props.orchids.length <= 0 && ! props.isLoading) {
        return <p>Nenhuma orquídea encontrada.</p>;
    }

    return (
        <table className="table spaced table-striped">
            <thead className="thead-default">
                <tr>
                    <th>#</th>
                    <th colSpan="2">Nome</th>
                </tr>
            </thead>
            <tbody>
                {props.orchids.map(renderOrchidsRows)}
            </tbody>
        </table>
    );
};

const renderOrchidsRows = (orchid, index) => {
    return (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{orchid.name}</td>
            <td><Link to="/orquideas">Detalhes</Link></td>
        </tr>
    );
};
