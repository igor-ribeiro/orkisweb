'use strict';

import React from 'react';
import { Link } from 'react-router';

import OrchidsTableRows from './orchids-table-rows';
import Pagination from '../common/pagination';

export default (props) => {
    if (props.orchids.length <= 0 && ! props.isLoading) {
        return <p>Nenhuma orquídea encontrada.</p>;
    }

    if (props.isLoading) {
        return <div></div>;
    }

    return (
        <div>
            <table className="table spaced table-striped">
                <thead className="thead-default">
                    <tr>
                        <th>#</th>
                        <th colSpan="2">Nome</th>
                    </tr>
                </thead>

                <OrchidsTableRows orchids={props.orchids} pagination={props.pagination}/>
            </table>

            <Pagination pagination={props.pagination} current={props.currentPage || 1} url="orquideas"/>
        </div>
    );
};
