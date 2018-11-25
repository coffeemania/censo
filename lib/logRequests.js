export default (logger) => async (ctx, next) => {

    const start = new Date();
    await next();
    const ms = new Date() - start;

    logger.info(`${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`);
};
