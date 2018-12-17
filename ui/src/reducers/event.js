export default (prevState = 'EVENT', action = {}) => {

    const state = {...prevState};

    switch (action.type) {

        case 'GET_EVENT_STARTED':

            // clean the event
            return {};

        case 'GET_EVENT_SUCCESS':

            return {
                ...state,
                ...action.event
            };

        case 'UPDATE_EVENT_STATUS_SUCCESS':

            if (action.referer !== 'Event') return state;

            // TODO linter
            state.appealHistory.push(action.eventStatusItem);

            return {
                ...state,
                lastUpdated: action.eventStatusItem.datetime
            };


        default:
            return {...state};
    }
};
