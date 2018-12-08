import {call, put, takeLatest} from 'redux-saga/effects';
import Backend from '../lib/backend';


function* getEvent(action) {
    try {
        console.log(action);
        const event = yield call(() => Backend.get(`/event/${action.id}`));
        yield put({type: 'GET_EVENT_SUCCESS', event: event.data});
    } catch (e) {
        yield put({type: 'GET_EVENT_FAILED', message: e.message});
    }
}


function* eventPage(action) {
    yield getEvent(action);
}


export default function* rootSaga() {
    yield takeLatest('EVENT', eventPage);
};
