import api from './api';
import event from './event';
import events from './events';
import vehicles from './vehicles';


export default (router, env) => {

    router.prefix(`/${env}`);

    router.use('/api', api);

    router.use('/event', event);
    router.use('/events', events);

    router.use('/vehicles', vehicles);
};
