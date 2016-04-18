'use strict';

import React from 'react';

import InputGroup from '../components/common/form/input-group';

export default class FormHelper {
    static change = (state, target) => {
        state[Humps.camelize(target.id)] = target.value;

        return state;
    }

    static renderFields = (inputs, model, commonAtts, hide) => {
        let props;

        return inputs.filter((input) => {
                return (hide)
                    ? hide.indexOf(input.id) < 0
                    : input;
            })
            .map((input) => {
                props = {
                    ...input,
                    ...commonAtts,
                    value: model[input.id]
                };

                return <InputGroup
                    key={input.id}
                    {...props}
                    />
            });
    }
}
