export default (state = '', action = {}) => {

    switch (action.type) {

        case 'GET_EVENTS_SUCCESS':

            return {
                ...state,
                ...action.meta
            };

        case 'EVENTS':

            return {
                ...state,
                page: action.page || 1
            };


        default:
            return {...state};
    }
};
