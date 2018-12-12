import {all, call, put, fork, select, take} from 'redux-saga/effects';
import Backend from '../services/backend';
import {getEvent, getEventsPagination, getVehicles} from '../selectors'


/**
 * Fetchers
 */

function* fetchEvent(id) {
    try {
        yield put({type: 'GET_EVENT_STARTED'});
        const event = yield call(() => Backend.get(`/event/${id}`));
        yield put({type: 'GET_EVENT_SUCCESS', event: event.data});
    } catch (e) {
        yield put({type: 'GET_EVENT_FAILED', message: e.message});
    }
}

function* fetchEvents({page}) {
    try {
        const events = yield call(() => Backend.get(`/events?page=${page}`));
        yield put({type: 'GET_EVENTS_SUCCESS', events: events.data.items});
    } catch (e) {
        yield put({type: 'GET_EVENTS_FAILED', message: e.message});
    }
}

function* fetchVehicles() {
    try {
        const vehicles = yield call(() => Backend.get('/vehicles'));
        yield put({type: 'GET_VEHICLES_SUCCESS', vehicles: vehicles.data});
    } catch (e) {
        yield put({type: 'GET_VEHICLES_FAILED', message: e.message});
    }
}


/**
 * Cache
 */

// Loads an event unless it's cached
function* loadEvent(id) {
    const cached = yield select(getEvent, id);
    if (!cached) yield call(fetchEvent, id);
}


// Loads the events unless they're cached
function* loadEvents() {
    // const cached = yield select(getEvents);
    // if (Object.keys(cached).length === 0) yield call(fetchEvents);

    // no cache for now
    const eventsPagination = yield select(getEventsPagination);
    yield call(fetchEvents, eventsPagination);
}

// Loads the fetchVehicles unless they're cached
function* loadVehicles() {
    const cached = yield select(getVehicles);
    if (Object.keys(cached).length === 0) yield call(fetchVehicles);
}


/**
 * Watchers
 */

// Fetches data for an Event
function* watchLoadEventPage() {
    while (true) {
        const {payload} = yield take('EVENT');
        yield fork(loadEvent, payload.id);
    }
}

// Fetches data for the Events
function* watchLoadEventsPage() {
    while (true) {
        yield take('EVENTS');
        yield fork(loadEvents);
    }
}

// Fetches data for the Vehicles
function* watchLoadVehiclesPage() {
    while (true) {
        yield take('VEHICLES');
        yield fork(loadVehicles);
    }
}


/**
 * Root
*/
export default function* rootSaga() {

    yield all([
        fork(watchLoadEventPage),
        fork(watchLoadEventsPage),
        fork(watchLoadVehiclesPage)
    ]);
};
