'use strict';

import React from 'react';
import { Link } from 'react-router';

export default (props) => {
    let { pagination, current } = props;

    const totalPages = Array.apply('', Array(pagination.lastPage));

    current = new Number(current);

    if (pagination.lastPage == 1) {
        return <div></div>;
    }

    return (
        <nav className="pagination-container">
            <ul className="pagination">
                <Previous current={current} url={props.url}/>

                {totalPages.map((_, page) => {
                    return (
                        <PaginationLink
                            page={page + 1}
                            current={current}
                            url={props.url}
                            key={page}
                            />
                        );
                })}

                <Next current={current} lastPage={pagination.lastPage} url={props.url}/>
            </ul>
        </nav>
    );
};

const Previous = (props) => {
    if (props.current == 1) {
        return <li className="page-item"></li>;
    }

    return (
        <li className="page-item">
            <Link to={`/${props.url}/pagina/${props.current - 1}`} className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
            </Link>
        </li>
    );
}

const Next = (props) => {
    if (props.current == props.lastPage) {
        return <li className="page-item"></li>;
    }

    return (
        <li className="page-item">
            <Link to={`/${props.url}/pagina/${props.current + 1}`} className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
            </Link>
        </li>
    );
}

const PaginationLink = (props) => {
    const isCurrent = props.page == props.current;
    return (
        <li className={`page-item ${isCurrent ? 'active' : ''}`}>
            <Link to={`/${props.url}/pagina/${props.page}`} className="page-link">
                {props.page}
                {isCurrent ? <span className="sr-only">(current)</span> : ''}
            </Link>
        </li>
    );
}
