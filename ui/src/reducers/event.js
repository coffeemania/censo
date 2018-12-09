export default (state = 'EVENT', action = {}) => {

    switch (action.type) {

        // case 'EVENT':
        //
        //     return {
        //         ...state
        //     };

        case 'GET_EVENT_SUCCESS':

            return {
                ...state,
                ...action.event
            };


        default:
            return {...state};
    }
};
