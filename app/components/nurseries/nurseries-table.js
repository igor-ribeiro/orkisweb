'use strict';

import React from 'react';
import { Link } from 'react-router';


const renderNurseryRow = (nursery, index) => {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{nursery.name}</td>
            <td>{nursery.document}</td>
            <td>
                <Link to={`orquidarios/${nursery.document}/editar`} className="btn btn-link">Editar</Link>                
                <Link to={`orquidarios`} className="btn btn-danger">Remover</Link>                
            </td>
        </tr>
    );
};

export default (props) => {
    return (
        <table className="table spaced">
            <thead className="thead-default">
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>CNPJ</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.nurseries.map(renderNurseryRow)}
            </tbody>
        </table>
    );
};
