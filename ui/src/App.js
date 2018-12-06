import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {Redirect, Route} from 'react-router';
import store, {history} from './store';
import routes from './routes';


class App extends Component {
    render() {
        return (
            <div>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {routes.map((route) => <Route {...route}/>)}
                    <Redirect from='/' to='/events'/>
                    <Route render={() => (<div>Not found</div>)} />
                </ConnectedRouter>
            </Provider>
            </div>
        );
    }
}

export default App;
