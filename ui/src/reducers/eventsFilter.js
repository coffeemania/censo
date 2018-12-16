export default (state = 'EVENTS', action = {}) => {

    switch (action.type) {

        case 'EVENTS_FILTER':

            // reset
            // TODO
            if (!action.where) return {
                id: '',
                location: '',
                vehicle: ''
            };

            // apply
            return {
                ...state,
                ...action.where
            };


        default:
            return {...state};
    }
};
