import moment from 'moment';
import Event from '../models/event';
import {normalize} from '../lib/utils';


/**
 * Get the events
 * @param ctx
 */
export const get = async (ctx) => {

    const events = await Event.query()

        .limit(10)  // REMOVEME

        .eager('vehicle')

        .map((event) => ({
            ...event,
            datetime: moment(event.datetime).format('DD.MM.YYYY HH:mm'),
            statusCheckUrl: process.env.STATUS_CHECK_URL ? `${process.env.STATUS_CHECK_URL}${event.foreignId}` : event.foreignId
        }));


    ctx.ok(normalize(events));
};
