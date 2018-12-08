import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {connectRoutes} from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import createSagaMonitor from '@clarketm/saga-monitor';
import rootSaga from '../sagas';
import routesMap from '../routes';
import reducers from '../reducers';


// mock
const events = {};
[...Array(10).keys()]
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


const {middleware, enhancer, initialDispatch} = connectRoutes(createHistory(), routesMap, {initialDispatch: false});

const rootReducer = combineReducers({...reducers});
const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: createSagaMonitor({
        level: 'log',
        effectTrigger: true,
        effectResolve: true,
        actionDispatch: true
    })
});
const middlewares = applyMiddleware(middleware, sagaMiddleware);


/* eslint no-underscore-dangle: 0 */
const composeEnhancers = typeof window === 'object' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose);
const enhancers = composeEnhancers(enhancer, middlewares);

const store = createStore(rootReducer, initialState, enhancers);

sagaMiddleware.run(rootSaga);
// initialDispatch();

export default store;
