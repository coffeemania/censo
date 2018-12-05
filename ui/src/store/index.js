import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import thunk from 'redux-thunk';

import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();


// mock
const events = {};
[...Array(50).keys()]
    .forEach((i) => {
        events[i] = {
            id: i,
            date: new Date(),
            title: `event_${i}`,
            vehicle: `vehicle_${i}`,
            status: 'pending'
        };
    });

const initialState = {
    events
    // ...
};


function addPromiseThunkSupport(store) {
    const {dispatch} = store;

    return action => {
        if (typeof action.then === 'function') {
            return action.then(dispatch);
        }
        if (typeof action === 'function') {
            return action(dispatch);
        }
        return dispatch(action);
    };
}

const composeEnhancers = composeWithDevTools({realtime: true});
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
);

store.dispatch = addPromiseThunkSupport(store);

export default store;
