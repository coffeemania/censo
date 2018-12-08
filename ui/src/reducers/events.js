export default (state = 'EVENTS', action = {}) => {

    // console.log(action.type);

    switch (action.type) {

        case 'EVENTS':

            console.log('EVENTS!');

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
