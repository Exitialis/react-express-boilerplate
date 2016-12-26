import React, { Component } from 'react';
import ReduxCounter from './ReduxCounter';

class HomePage extends Component {
    render() {
        return (
            <div>
                <p>Домашняя страница</p>
                <ReduxCounter/>
            </div>

        );

    }
}

export default HomePage;