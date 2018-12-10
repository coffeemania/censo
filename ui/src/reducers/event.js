export default (state = 'EVENT', action = {}) => {

    switch (action.type) {

        case 'GET_EVENT_STARTED':

            // clean the event
            return {};

        case 'GET_EVENT_SUCCESS':

            return {
                ...state,
                ...action.event
            };


        default:
            return {...state};
    }
};
