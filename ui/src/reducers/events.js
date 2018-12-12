export default (state = 'EVENTS', action = {}) => {

    switch (action.type) {

        case 'GET_EVENTS_SUCCESS':

            return {
                // ...state,
                ...action.events
            };


        default:
            return {...state};
    }
};
