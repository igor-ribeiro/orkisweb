'use strict';

import React from 'react';

export default class App extends React.Component {
    render = () => {
        return (
            <div className="page">
                {this.props.children}
            </div>
        );
    }
}
