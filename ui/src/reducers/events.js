export default (state = 'EVENTS', action = {}) => {

    switch (action.type) {

        case 'events':

            return {
                ...state,
            };

        // ...


        default:
            return state;
    }
};
