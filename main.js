import Knex from 'knex';
import {Model} from 'objection';
import op from 'object-path';
import { config } from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import Cors from '@koa/cors';
import BodyParser from 'koa-bodyparser';
import Helmet from 'koa-helmet';
import respond from 'koa-respond';
// import passport from 'koa-passport';
import routes from './routes';
// import config from './config';
import log from './lib/log';
import logRequests from './lib/logRequests';
// import * as auth from './lib/authentication/auth';  // do not remove

import knexConfig from './knexfile';


config(); // dotenv


const knex = Knex(knexConfig.development);
Model.knex(knex);

const env = process.env.NODE_ENV || 'dev',
    port = process.env.API_PORT || '3000',
    debug = op.get(config, 'debug', false);

const app = new Koa();
const router = new Router();

app.use(Helmet());
app.use(logRequests(log));

app.use(Cors());
app.use(BodyParser({
    enableTypes: ['json', 'text', 'form'],
    jsonLimit: op.get(config, 'BodyParser.jsonLimit', '5mb') ,
    strict: true,
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }
}));

// app.use(passport.initialize());

app.use(respond());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {error: err.message};
        ctx.app.emit('error', err, ctx);
    }
});

routes(router, env);
app.use(router.routes());
app.use(router.allowedMethods());


log.info(`Node ${process.version}`);
log.info(`Welcome to Censo API! Environment: ${env}`);

app.listen(port, () => log.info(`Koa started on port ${port}`));

log.debug('Router stack:');
router.stack.forEach((x) => log.debug(`- ${op.get(x, 'path')}`));


export default app;
