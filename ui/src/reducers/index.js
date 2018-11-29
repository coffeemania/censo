
export default function reducer(state = {}, action) {

    switch (action.type) {

        case 'action_type':

            // action.data

            return {
                ...state,
                test: {}
            };

        // ...


        default:
            return state;
    }

};
