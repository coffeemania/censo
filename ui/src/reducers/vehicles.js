export default (state = 'VEHICLES', action = {}) => {

    switch (action.type) {

        case 'GET_VEHICLES_SUCCESS':

            return {
                ...state,
                ...action.vehicles
            };


        default:
            return {...state};
    }
};
