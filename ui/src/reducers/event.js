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

            // TODO linter
            state.appealHistory.push(action.eventStatusItem);

            console.dir(state);

            return {
                ...state
            };


        default:
            return {...state};
    }
};
