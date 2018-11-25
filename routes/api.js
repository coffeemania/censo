import Router from 'koa-router';

const router = new Router();

router.get('/', (ctx) => ctx.ok({
    live: true,
    uptime: process.uptime()
}));

export default router.routes();
