'use strict';

import LocalStorage from 'humble-localstorage';

export default (type, message) => {
    LocalStorage.setObject('alert', {
        type,
        message,
    });
};
