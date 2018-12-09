export default (state = 'EVENT', action = {}) => {

    switch (action.type) {

        case 'GET_EVENT_SUCCESS':

            return {
                ...state,
                [action.event.id]: action.event
            };


        default:
            return {...state};
    }
};
