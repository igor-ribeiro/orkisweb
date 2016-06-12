import React from 'react';

import Input from './input';
import Label from './label';

const hasError = (id, errors) => {
    return errors && !! errors[id];
};

const getClassName = (id, errors) => {
    return `form-group ${hasError(id, errors) ? 'has-danger' : ''}`;
};

const renderError = (id, errors) => {
    return hasError(id, errors)
        ? (<div className="text-help"><small>{errors[id]}</small></div>)
        : '';
};

export default (props) => {
    return (
        <fieldset className={getClassName(props.id, props.errors)}>
            <Label
                htmlFor={props.id}
                >
                {props.label}
            </Label>

            <Input
                id={props.id}
                type={props.type}
                onChange={props.handleChange}
                value={props.value}
                name={props.name}
                autoComplete={props.autocomplete}
                />

            {renderError(props.id, props.errors)}
        </fieldset>
    );
}
