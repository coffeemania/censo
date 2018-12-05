
export default function (state = {}, action) {

    switch (action.type) {

        case 'GOT_DATA':

            // action.data

            // console.log(action.data);

            return {
                ...state,
                test: action.data.msg
            };

        // ...


        default:
            return state;
    }

};
