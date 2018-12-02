import Event from '../models/event';


/**
 * Get the events
 * @param ctx
 */
export const get = async (ctx) => {

    const event = await Event.query()
        .eager('vehicle');

    ctx.ok(event);
};

