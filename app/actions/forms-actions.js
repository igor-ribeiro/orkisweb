'use strict';

export const UPDATE_FORM = 'UPDATE_FORM';
export const CLEAR_FORM = 'CLEAR_FORM';

export const updateForm = (data) => {
    return {
        type: UPDATE_FORM,
        data,
    };
};

export const clearForm = (key) => {
    return {
        type: CLEAR_FORM,
        key,
    };
};
