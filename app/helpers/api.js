'use strict';

import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import Humps from 'humps';
import Cookies from 'js-cookie';
import { merge } from './helpers';

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
        let url = `${API.endpoint}/${resource}`;

        const options = {
            method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        data = merge(data, {
            _token: Cookies.get('token'),
        });

        if (! Array('get', 'head').includes(method)) {
            options.body = JSON.stringify(
                Humps.decamelizeKeys(data)
            );
        } else {
            url += '?';

            for (let key in data) {
                url += `${Humps.decamelize(key)}=${data[key]}&`;
            }
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
