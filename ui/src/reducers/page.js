import {NOT_FOUND} from 'redux-first-router';

const components = {
    EVENT: 'Event',
    EVENTS: 'Events',
    [NOT_FOUND]: 'NotFound'
};

export default (state = 'Events', action = {}) => components[action.type] || state;
