export default (state = 'EVENTS', action = {}) => {

    switch (action.type) {

        case 'GET_EVENT_SUCCESS':

            return {
                ...state,
                ...action.event
            };


        default:
            return {...state};
    }
};
