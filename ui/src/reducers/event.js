export default (state = 'EVENTS', action = {}) => {

    switch (action.type) {

        case 'EVENT_PAGE':
            console.log('EVENT_PAGE');

            return {
                ...state
            };

        case 'GET_EVENT_SUCCESS':

            return {
                ...state,
                ...action.event
            };


        default:
            return {...state};
    }
};
