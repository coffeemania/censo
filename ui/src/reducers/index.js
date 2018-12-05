import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import events from './events';


export default (history) => {

    return combineReducers({
        router: connectRouter(history),
        events
    });
}
