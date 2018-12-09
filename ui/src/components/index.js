import React from 'react';
import {NOT_FOUND} from 'redux-first-router';
import Event from './Event';
import EventList from './EventList';

export default {
    EVENT: Event,
    EVENTS: EventList,
    [NOT_FOUND]: () => (<div>404</div>)
};
