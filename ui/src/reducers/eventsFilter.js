export default (state = 'EVENTS', action = {}) => {

    switch (action.type) {

        case 'EVENTS_FILTER':

            return {
                ...state,
                ...action.where
            };


        default:
            return {...state};
    }
};
