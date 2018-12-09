import {all, call, put, fork, select, take, takeLatest} from 'redux-saga/effects';
import Backend from '../services/backend';
import {getEvent} from '../reducers/selectors'


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


function* eventsPage(action) {
    yield fetchEvents(action);
    yield put({type: 'EVENTS_PAGE'});
}

function* eventPage(action) {
    yield fetchEvent(action.id);
    yield put({type: 'EVENT_PAGE', payload: {id: action.id}});
}


// Loads an event unless it's cached
function* loadEvent(id) {
    const repo = yield select(getEvent, id);
    if (!repo) yield call(fetchEvent, id);
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


/**
 * Root
*/
export default function* rootSaga() {

    yield all([
        takeLatest('EVENTS', eventsPage),
        takeLatest('EVENT', eventPage),
        fork(watchLoadEventPage)
    ]);
};
