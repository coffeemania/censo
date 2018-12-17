import op from 'object-path'


export default (prevState = 'EVENTS', action = {}) => {

    const state = {...prevState};


    switch (action.type) {

        case 'GET_EVENTS_SUCCESS':

            return {
                // ...state,
                ...action.events
            };

        case 'UPDATE_EVENT_STATUS_SUCCESS':

            if (action.referer !== 'EventList') return state;

            const {eventId} = action.eventStatusItem;
            let historyCount = op.get(state, [eventId, 'historyCount'], 0);
            op.set(state, [eventId, 'historyCount'], ++historyCount);

            return {
                ...state
            };



        default:
            return {...state};
    }
};
