'use strict';

import React from 'react';

import { merge } from '../../../helpers/helpers';

import Input from './input';
import InputGroup from './input-group';

const getInputs = (inputs, hidden) => {
    return inputs.filter((input) => shouldBeHidden(input, hidden));
};

const shouldBeHidden = (input, hidden) => {
    return hidden ? hidden.indexOf(input.id) < 0 : input;
};

const renderInputs = (inputs, props) => {
    return inputs.map((input) => renderInput(input, props));
};

const renderInput = (input, inputProps) => {
    const props = merge(inputProps, {
        ...inputProps,
        ...input,
        value: inputProps.model[input.id],
        key: input.id,
    });

    return <InputGroup {...props}/>;
};

export default (props) => {
    const inputs = getInputs(props.inputs, props.hidden);
    const inputsProps = {
        ...props.common,
        model: props.model,
    };    

    return (
        <div>
            {renderInputs(inputs, inputsProps)}
        </div>
    );
};
