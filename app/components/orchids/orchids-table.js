'use strict';

import React from 'react';
import { Link } from 'react-router';

import OrchidsTableRows from './orchids-table-rows';

export default (props) => {
    if (props.orchids.length <= 0 && ! props.isLoading) {
        return <p>Nenhuma orquídea encontrada.</p>;
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

                <OrchidsTableRows orchids={props.orchids}/>
            </table>
        </div>
    );
};
