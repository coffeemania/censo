import Router from 'koa-router';
import * as events from '../controllers/events';


const router = new Router();


/**
 * CRUD for events
 */
router.get('/', events.get);


export default router.routes();
