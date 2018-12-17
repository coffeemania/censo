import React from 'react';
import {NOT_FOUND} from 'redux-first-router';
import Event from './Event';
import EventAdd from './EventAdd';
import EventList from './EventList';
import Vehicles from './Vehicles';

export default {
    EVENT: Event,
    EVENT_ADD: EventAdd,
    EVENTS: EventList,
    VEHICLES: Vehicles,
    [NOT_FOUND]: () => (<div>404</div>)
};
