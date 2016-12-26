import React, { Component, PropTypes } from 'react';
import AppProd from './App.prod';
import DevTools from '../DevTools';
import './bootstrap.less';

const propTypes = {
    children: PropTypes.node
};

class App extends Component {
    render() {
        return (
            <AppProd>
                <div>
                    {this.props.children}
                    <DevTools />
                </div>
            </AppProd>
        );
    }
}

App.propTypes = propTypes;

export default App;
