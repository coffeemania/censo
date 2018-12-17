import {all, call, put, fork, select, take, takeLatest} from 'redux-saga/effects';
import Backend from '../services/backend';
import {getEventsPagination, getEventsFilter, getVehicles} from '../selectors';


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

function* updateEventStatus({payload: {id}, referer}) {
    try {
        yield put({type: 'UPDATE_EVENT_STATUS_STARTED'});
        const {data} = yield call(() => Backend.get(`/event/${id}/status`));
        yield put({type: 'UPDATE_EVENT_STATUS_SUCCESS', eventStatusItem: data, referer});
    } catch (e) {
        yield put({type: 'UPDATE_EVENT_STATUS_FAILED', message: e.message});
    }
}


function* fetchEvents(eventFilter = {}, {page = 1}) {
    try {
        yield put({type: 'GET_EVENTS_STARTED'});
        const filterQuery = Object.entries(eventFilter)
            .filter(([k, v]) => !!v)    // eslint-disable-line
            .map(([k, v]) => `${k}=${v}`)
            .join('&');

        const events = yield call(() => Backend.get(`/events?page=${page - 1}${filterQuery ? `&${filterQuery}` : ''}`));
        yield put({type: 'GET_EVENTS_SUCCESS', events: events.data.content, meta: {
                page: events.data.number + 1,
                pageSize: events.data.size,
                total: events.data.totalElements,
                totalPages: events.data.totalPages,
                first: events.data.first,
                last: events.data.last
            }});
    } catch (e) {
        yield put({type: 'GET_EVENTS_FAILED', message: e.message});
    }
}

function* fetchVehicles() {
    try {
        yield put({type: 'GET_VEHICLES_STARTED'});
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
    // const cached = yield select(getEvent, id);
    // if (!cached) yield call(fetchEvent, id);

    // no cache for now
    yield call(fetchEvent, id);
}


// Loads the events unless they're cached
function* loadEvents() {
    // const cached = yield select(getEvents);
    // if (Object.keys(cached).length === 0) yield call(fetchEvents);

    // no cache for now
    const eventsFilter = yield select(getEventsFilter);
    const eventsPagination = yield select(getEventsPagination);
    yield call(fetchEvents, eventsFilter, eventsPagination);
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

// Invoke events fetching once the filter changed
function* watchEventsFilterChanged() {
    while (true) {
        yield take('EVENTS_FILTER');
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
        fork(watchEventsFilterChanged),
        fork(watchLoadVehiclesPage)
    ]);

    yield takeLatest('EVENT_CHECK_STATUS', updateEventStatus);

    // yield put({type: 'EVENTS'});
};
