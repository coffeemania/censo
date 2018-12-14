import Router from 'koa-router';
import * as event from '../controllers/event';


const router = new Router();


/**
 * CRUD for event
 */
router.get('/:id', event.get);
router.get('/:id/status', event.getAppealStatus);
// router.post('/', event.post);
// router.put('/:id', event.put);
// router.del('/:id', event.del);


export default router.routes();
