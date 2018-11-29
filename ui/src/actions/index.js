
export function onToggle(msg) {
    return async (dispatch) => {
        // went to backend

        console.log('onToggle');

        dispatch({
            type: 'GOT_DATA',
            data: {
                msg:'hello!'
            }
        });
    };
}

