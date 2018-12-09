import {call, put, takeLatest} from 'redux-saga/effects';
import Backend from '../services/backend';


function* getEvent(action) {
    try {
        const event = yield call(() => Backend.get(`/event/${action.id}`));
        yield put({type: 'GET_EVENT_SUCCESS', event: event.data});
    } catch (e) {
        yield put({type: 'GET_EVENT_FAILED', message: e.message});
    }
}

function* getEvents() {
    try {
        const events = yield call(() => Backend.get('/events'));
        yield put({type: 'GET_EVENTS_SUCCESS', events: events.data});
    } catch (e) {
        yield put({type: 'GET_EVENTS_FAILED', message: e.message});
    }
}


function* eventsPage(action) {
    yield getEvents(action);
    yield put({type: 'EVENTS_PAGE'});
}

function* eventPage(action) {
    yield getEvent(action);
    yield put({type: 'EVENT_PAGE', payload: {id: action.id}});
}


export default function* rootSaga() {
    yield takeLatest('EVENTS', eventsPage);
    yield takeLatest('EVENT', eventPage);
};
