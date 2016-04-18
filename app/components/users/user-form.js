'use strict';

import React from 'react';
import { Link } from 'react-router';
import FormHelper from '../../helpers/form-helper';

import Form from '../common/form/form';
import Button from '../common/form/button';
import MultipleInputs from '../common/form/multiple-inputs';
import userFields from './user-fields';

export default (props) => {
    const commonProps = {
        handleChange: props.handleChange,
        errors: props.errors,
    };

    const renderCancelButton = () => {
        const button = (
            <Button
                onClick={props.handleCancel}
                style="default"
                value="Cancelar"
                />
        );

        return props.cancel
            ? button
            : '';
    };

    return (
        <Form onSubmit={props.handleSubmit}>
            <MultipleInputs
                inputs={userFields}
                model={props.user || {}}
                common={commonProps}
                hidden={props.hidden}
                />

            {renderCancelButton()}{' '}

            <Button
                onClick={props.handleSubmit}
                style="primary"
                type="submit"
                value={props.button}
                />
        </Form>
    );
}
