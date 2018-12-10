import op from 'object-path';
import Event from '../models/event';
import moment from 'moment';


/**
 * Get the event
 * @param ctx
 */
export const get = async (ctx) => {
    const id = op.get(ctx, 'params.id');

    if (!id) throw new Error('Got empty id');

    const event = await Event.query()
        .where('id', '=', id)
        .eager('vehicle');

    ctx.ok({
        ...event.shift(),
        datetime: moment(event.datetime).format('DD.MM.YYYY HH:mm'),
        statusCheckUrl: process.env.STATUS_CHECK_URL ? `${process.env.STATUS_CHECK_URL}${event.foreignId}` : event.foreignId
    });
};

