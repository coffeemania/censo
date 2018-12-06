import Event from '../models/event';
import {normalize} from '../lib/utils';


/**
 * Get the events
 * @param ctx
 */
export const get = async (ctx) => {

    const event = await Event.query()
        .eager('vehicle');

    ctx.ok(normalize(event));
};
