'use strict';

import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import Humps from 'humps';

export default class API {
    static endpoint = 'http://orkisapi.dev/v1';

    static get(resource, data) {
        return API.call('get', resource, data);
    }

    static post(resource, data) {
        return API.call('post', resource, data);
    }

    static put(resource, data) {
        return API.call('put', resource, data);
    }

    static delete(resource, data) {
        return API.call('delete', resource, data);
    }

    static patch(resource, data) {
        return API.call('patch', resource, data);
    }

    static call(method, resource, data = {}, headers = {}) {
        const url = `${API.endpoint}/${resource}`;

        const options = {
            method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        if (! Array('get', 'head').includes(method)) {
            options.body = JSON.stringify(
                Humps.decamelizeKeys(data)
            );
        }

        return fetch(url, options)
            .then((response) => response.json())
            .then((response) => {
                response = Humps.camelizeKeys(response);

                return response.errors
                    ? Promise.reject(response)
                    : Promise.resolve(response);
            });
    }
};
