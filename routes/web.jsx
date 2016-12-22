import React from 'react';
import { IndexRoute, Route }  from 'react-router';
import App from '../resources/components/App';
import HomePage from '../resources/components/HomePage';

export default (
    <Route component={App} path='/'>
        <IndexRoute component={HomePage} />
        <Route component={HomePage} path='home' />
    </Route>
);