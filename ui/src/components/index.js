import React from 'react';
import {NOT_FOUND} from 'redux-first-router';
import Event from './Event';
import EventList from './EventList';
import Vehicles from './Vehicles';

export default {
    EVENT: Event,
    EVENTS: EventList,
    VEHICLES: Vehicles,
    [NOT_FOUND]: () => (<div>404</div>)
};
