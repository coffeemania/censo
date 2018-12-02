import Router from 'koa-router';
import * as vehicles from '../controllers/vehicles';


const router = new Router();


/**
 * CRUD for vehicles
 */
router.get('/', vehicles.get);


export default router.routes();
