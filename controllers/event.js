// import op from 'object-path';
import Event from '../models/event';


/**
 * Get the event
 * @param ctx
 */
export const get = async (ctx) => {
    // const id = op.get(ctx, 'params.id');

    const event = await Event.query();

    ctx.ok(event);
};

