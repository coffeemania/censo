import op from 'object-path';
import moment from 'moment';
import {Event} from '../models';
import {Provider} from '../lib/Provider';


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

/**
 * Get a status for the event
 * @param ctx
 */
export const getAppealStatus = async (ctx) => {
    const id = op.get(ctx, 'params.id');

    if (!id) throw new Error('Got empty id');

    const events = await Event.query()
        .alias('e')
        .eager('vehicle')
        .where('e.id', '=', id);

    const eventForeignId = op.get(events.shift(), 'foreignId');

    if (!eventForeignId) throw new Error('Got no event');

    const result = await Provider.getAppealStatus(eventForeignId);

    ctx.ok(result);
};
