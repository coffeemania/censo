import op from 'object-path';
import Event from '../models/event';


/**
 * Get the event
 * @param ctx
 */
export const get = async (ctx) => {
    const id = op.get(ctx, 'params.id');

    if (!id) throw new Error('Got empty id');

    const event = await Event.query()
        .where('id', '=', id);

    ctx.ok(event.shift());
};

