import React from 'react';
import { IndexRoute, Route }  from 'react-router';
import App from '../resources/components/App';
import HomePage from '../resources/components/HomePage';
import Kappa from '../resources/components/Kappa';

export default (
    <Route component={App} path='/'>
        <IndexRoute component={Kappa} />
        <Route component={HomePage} path='home' />
    </Route>
);