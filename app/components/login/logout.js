'use strict';

import React from 'react';
import appHistory from '../../app-history';
import Auth from '../../helpers/auth';

export default class Logout extends React.Component {
    render = () => {
        return <div className="container">Saindo...</div>;
    }
    
    componentDidMount = () => {
        if (Auth.logout()) {
           appHistory.push('/acessar');
        }
    }
}
