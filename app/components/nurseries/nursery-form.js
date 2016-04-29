'use strict';

import React from 'react';

import nurseryFields from './nursery-fields';

import Form from '../common/form/form';
import Button from '../common/form/button';
import MultipleInputs from '../common/form/multiple-inputs';

export default (props) => {
    const common = {
        errors: props.errors,
        handleChange: props.handleChange,
    };

    return (
        <Form onSubmit={props.handleSubmit}>
            <MultipleInputs
                inputs={nurseryFields}
                model={props.nursery || {}}
                common={common}
                />

            <Button
                style="primary"
                type="submit"
                value={props.button}
                />
        </Form>
    );
};
