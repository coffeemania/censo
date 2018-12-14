import op from 'object-path';
import {Event, Vehicle} from '../models';
import moment from 'moment';


/**
 * Get the event
 * @param ctx
 */
export const get = async (ctx) => {
    const id = op.get(ctx, 'params.id');

    if (!id) throw new Error('Got empty id');

    const event = await Event.query()
        .alias('e')
        .eager('vehicle')
        .where('e.id', '=', id);

    ctx.ok({
        ...event.shift(),
        datetime: moment(event.datetime).format('DD.MM.YYYY HH:mm'),
        statusCheckUrl: process.env.STATUS_CHECK_URL ? `${process.env.STATUS_CHECK_URL}${event.foreignId}` : event.foreignId
    });
};
