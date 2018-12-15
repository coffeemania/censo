import op from 'object-path';
import moment from 'moment';
import {Event} from '../models';
import {Provider} from '../lib/Provider';


const formatDateTime = (dt) => moment(dt).format('DD.MM.YYYY HH:mm');

/**
 * Get the event
 * @param ctx
 */
export const get = async (ctx) => {
    const id = op.get(ctx, 'params.id');

    if (!id) throw new Error('Got empty id');

    const events = await Event.query()
        .alias('e')
        .eager('[vehicle, appealHistory]')
        .where('e.id', '=', id);

    const event = events.shift();

    ctx.ok({
        ...event,
        datetime: formatDateTime(event.datetime),
        appealHistory: event.appealHistory ? event.appealHistory.map((item) => ({...item, datetime: formatDateTime(item.datetime)})) : [],
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

    const result = await Provider.getAppealStatus(id, eventForeignId);

    ctx.ok(result);
};
