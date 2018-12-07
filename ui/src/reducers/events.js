export default (state = 'EVENTS', action = {}) => {

    switch (action.type) {

        case 'events':

            console.log('events');

            return {
                ...state,
            };

        case 'event':

            console.log('event');

            return {
                ...state,
            };

        // ...


        default:
            return state;
    }
};
