import routesMap from '../routes';


const initialState = {
    pathname: '/events',
    type: 'EVENTS',
    payload: {},
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

export default (state = initialState, action = {}) => {

    if (!routesMap[action.type]) return {...state};

    return {
        pathname: action.meta.location.current.pathname,
        type: action.type,
        payload: {...action.payload},
        prev: action.meta.location.prev,
        kind: action.meta.location.kind,
        hasSSR: state.hasSSR,
        routesMap
    };
};
