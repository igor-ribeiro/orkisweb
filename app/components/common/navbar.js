'use strict';

import React from 'react';
import { Link } from 'react-router';

import Auth from '../../helpers/auth';

import Container from './container';

const renderLinks = () => {
    return (
        <ul className="nav navbar-nav pull-right">
            <li className="nav-item">
                <Link to="/orquideas" className="nav-link">Orquídeas</Link>
            </li>

            <li className="nav-item btn-group">
                <a className="dropdown-toggle nav-link" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {Auth.user().name}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <Link to="/perfil" className="dropdown-item">Editar Perfil</Link>
                    <Link to="/sair" className="dropdown-item">Sair</Link>
                </div>
            </li>
        </ul>
    );
}

export default (props) => {
    return (
        <div>
            <div className="navbar"><h1 className="navbar-brand">&nbsp;</h1></div>

            <nav className="navbar navbar-dark navbar-fixed-top bg-primary">
                <Container>
                    <Link to="/" className="navbar-brand">OrkisWeb <small><small>Beta</small></small></Link>
                    {props.hideLinks ? '' : renderLinks()}
                </Container>
            </nav>
        </div>
    );
};
