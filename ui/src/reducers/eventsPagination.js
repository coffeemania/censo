export default (state = '', action = {}) => {

    switch (action.type) {

        case 'EVENTS_FILTER':

            return {
                ...state,
                page: 1
            };

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
