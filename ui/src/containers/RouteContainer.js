import React, { Component } from 'react';
import {Redirect, HashRouter, Route, Switch} from 'react-router-dom';

import Dashboard from './Dashboard';
import connect from './connector';


class RouteContainer extends Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/dashboard" name="Home" component={connect(Dashboard)}/>
                    <Redirect from="/" to="/dashboard" />
                </Switch>
            </HashRouter>
        );
    }
}


export default RouteContainer;
