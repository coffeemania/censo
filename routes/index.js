import api from './api';
import event from './event';


export default (router, env) => {

    router.prefix(`/${env}`);

    router.use('/api', api);
    router.use('/event', event);
};
