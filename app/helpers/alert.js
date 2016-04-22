'use strict';

import LocalStorage from 'humble-localstorage';

export default class Alert {
    static alert(type, message, scope) {
        LocalStorage.setObject('alert', {
            type,
            message,
            scope,
        });
    }

    static success(message, scope) {
        this.alert('success', message, scope);
    }

    static error(message, scope) {
        this.alert('danger', message, scope);
    }

    static warning(message, scope) {
        this.alert('warning', message, scope);
    }

    static info(message, scope) {
        this.alert('info', message, scope);
    }
};
