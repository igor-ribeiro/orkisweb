'use strict';

import React from 'react';
import FormHelper from '../../helpers/form-helper';

import Form from '../common/form/form';
import Button from '../common/form/button';
import loginFields from './login-fields';
import MultipleInputs from '../common/form/multiple-inputs';

export default (props) => {
    const commonProps = {
        handleChange: props.handleChange,
        errors: props.errors
    };

    return (
        <Form handleSubmit={props.handleSubmit}>
            <MultipleInputs
                inputs={loginFields}
                model={props.credentials || {}}
                common={commonProps}
                hidden={props.hidden}
                />

            <Button
                onClick={props.handleSubmit}
                style="primary"
                type="submit"
                value="Acessar"
                />
        </Form>
    );
}
