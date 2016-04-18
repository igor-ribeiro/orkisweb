'use strict';

import React from 'react';
import LocalStorage from 'humble-localstorage';

import Navbar from './navbar';
import Alert from './alert';

export default (props) => {
    const hasAlertOnProps = () => {
        return props.alert && Object.keys(props.alert).length > 0;
    };

    const hasAlertOnLocalStorage = () => {
        return !! LocalStorage.getObject('alert');
    };

    const renderAlert = () => {
        let alert;

        if (hasAlertOnLocalStorage()) {
            alert = LocalStorage.getObject('alert');

            LocalStorage.removeItem('alert');
        }

        if (hasAlertOnProps()) {
            alert = props.alert;
        }

        return !! alert
            ? <Alert type={alert.type}>{alert.message}</Alert>
            : '';
    };

    return (
        <div>
            <Navbar hideLinks={props.hideNav}/>
            
            {renderAlert()}

            {props.children}
        </div>
    );
};
