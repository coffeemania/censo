import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import components from './components';


const App = ({type}) => {
    const Comp = components[type];
    return <Comp/>;
};


const mapStateToProps = ({location}) => ({type: location.type});

export default connect(mapStateToProps)(App);

App.propTypes = {
    type: PropTypes.string.isRequired
};



// import React, {Component} from 'react';
// import {Provider} from 'react-redux';
// import {ConnectedRouter} from 'connected-react-router';
// import {Redirect, Route} from 'react-router';
// import store, {history} from './store';
// import routes from './routes';
//
//
// class App extends Component {
//     render() {
//         return (
//             <div>
//             <Provider store={store}>
//                 <ConnectedRouter history={history}>
//                     {routes.map((route) => <Route {...route}/>)}
//                     <Redirect from='/' to='/events'/>
//                     <Route render={() => (<div>Not found</div>)} />
//                 </ConnectedRouter>
//             </Provider>
//             </div>
//         );
//     }
// }
//
// export default App;
