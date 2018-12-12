export default (state = '', action = {}) => {

    switch (action.type) {

        case 'EVENTS':

            console.log(action);

            return {
                ...state,
                page: action.page || 1
            };


        default:
            return {...state};
    }
};
