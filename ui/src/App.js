import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from './store';
import routes from './routes';
import {Route} from 'react-router';


class App extends Component {
    render() {
        return (
            <div>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {routes.map((route) => <Route {...route}/>)}
                </ConnectedRouter>
            </Provider>
            </div>
        );
    }
}

export default App;
