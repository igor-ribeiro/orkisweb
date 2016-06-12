'use strict';

import React from 'react';

export const merge = (object, atts) => Object.assign({}, object, atts);

export const renderRawHTML = (html) => merge({ __html: html});

export const renderJSONtoHTML = (json, key) => {
    if (typeof json == 'string') {
        return <p key={key}>{json}</p>;
    }

    if (typeof json == 'object') {
        return (
            <div key={key}>
                <h4>{json.title}</h4>
                {json.content.map((p, k) => renderJSONtoHTML(p, k))}
            </div>
        );
    }
};

export const renderJSONStringToHTML = (jsonString) => {
    if (! jsonString) {
        return null;
    }

    const json = JSON.parse(jsonString);

    return json.map((section, key) => {
        return renderJSONtoHTML(section, key);
    });
}