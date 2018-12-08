export default (state = 'EVENTS', action = {}) => {

    switch (action.type) {

        case 'GET_EVENT_SUCCESS':

            // console.dir(action);

            return {
                ...state,
                event: action.event
            };

        // case 'EVENT':
        //
        //     console.log('EVENT!');
        //
        //     // dispatch()
        //
        //     return {
        //         ...state,
        //     };

        // ...


        default:
            return {...state};
    }
};
