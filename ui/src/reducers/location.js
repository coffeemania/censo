// import store from '../store';
import routesMap from '../routes';


const initialState = {
    pathname: '/events',
    type: 'EVENTS',
    // payload: {param: 'id'},
    prev: {
        pathname: '',
        type: '',
        payload: {}
    },
    kind: undefined,
    // hasSSR: isServer() ? true : undefined,
    routesMap: {
        ...routesMap
    }
};

export default (state = initialState, action = {}) => ({...state});

    // console.info(`location :: ${action.type}`);

    // if (routesMap[action.type]) {
    //     return {
    //         pathname: action.meta.location.current.pathname,
    //         type: action.type,
    //         payload: {...action.payload},
    //         prev: action.meta.location.prev,
    //         kind: action.meta.location.kind,
    //         hasSSR: state.hasSSR,
    //         routesMap
    //     };
    // }

    // store.dispatch({type: 'EVENTS'});

    // return {...state};
// }
