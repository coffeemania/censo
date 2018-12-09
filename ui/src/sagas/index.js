import {all, call, put, fork, select, take, takeLatest} from 'redux-saga/effects';
import Backend from '../services/backend';
import {getEvent, getEvents} from '../reducers/selectors'


function* fetchEvent(id) {
    try {
        const event = yield call(() => Backend.get(`/event/${id}`));
        yield put({type: 'GET_EVENT_SUCCESS', event: event.data});
    } catch (e) {
        yield put({type: 'GET_EVENT_FAILED', message: e.message});
    }
}

function* fetchEvents() {
    try {
        const events = yield call(() => Backend.get('/events'));
        yield put({type: 'GET_EVENTS_SUCCESS', events: events.data});
    } catch (e) {
        yield put({type: 'GET_EVENTS_FAILED', message: e.message});
    }
}


/**
 * Cache
 */

// Loads an event unless it's cached
function* loadEvent(id) {
    const repo = yield select(getEvent, id);
    if (!repo) yield call(fetchEvent, id);
}


// Loads the events unless they're cached
function* loadEvents() {
    const repo = yield select(getEvents);
    if (Object.keys(repo).length === 0) yield call(fetchEvents);
}


/**
 * Watchers
 */

// Fetches data for an Event
function* watchLoadEventPage() {
    while (true) {
        const {payload} = yield take('EVENT_PAGE');
        yield fork(loadEvent, payload.id);
    }
}

// Fetches data for the Events
function* watchLoadEventsPage() {
    while (true) {
        yield take('EVENTS_PAGE');
        yield fork(loadEvents);
    }
}


/**
 * Root
*/
export default function* rootSaga() {

    yield all([
        fork(watchLoadEventPage),
        fork(watchLoadEventsPage)
    ]);
};
