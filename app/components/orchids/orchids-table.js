'use strict';

import React from 'react';
import { Link } from 'react-router';

export default (props) => {
    if (props.orchids.length <= 0 && ! props.isLoading) {
        return <p>Nenhuma orquídea encontrada.</p>;
    }

    return (
        <div>
            <table className="table spaced table-striped">
                <thead className="thead-default">
                    <tr>
                        <th>#</th>
                        <th colSpan="2">Nome</th>
                    </tr>
                </thead>

                <tbody>
                    {props.orchids.map(renderRows)}
                </tbody>
            </table>
        </div>
    );
};

const renderRows = (orchid, index) => {
    const id = index + 1;

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{orchid.name}</td>
            <td><Link to={`/orquideas/${orchid.hash}`}>Detalhes</Link></td>
        </tr>
    );
};
