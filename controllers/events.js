import moment from 'moment';
import op from 'object-path';
import {IndexablePage, Pageable, Sort} from '@panderalabs/koa-pageable';
import Event from '../models/event';
import {normalize} from '../lib/utils';


/**
 * Get the events
 * @param ctx
 */
export const get = async (ctx) => {

    // TODO
    const pageNumber = ctx.state.pageable.page || 1;
    const pageSize = ctx.state.pageable.size || 10;
    // const sort = ctx.state.pageable.sort;

    const events = await Event.query()

        .orderBy('id', 'desc')
        .offset((pageNumber - 1) * pageSize)
        .limit(pageSize)

        .eager('vehicle')

        .map((event) => ({
            ...event,
            datetime: moment(event.datetime).format('DD.MM.YYYY HH:mm'),
            statusCheckUrl: process.env.STATUS_CHECK_URL ? `${process.env.STATUS_CHECK_URL}${event.foreignId}` : event.foreignId
        }));


    ctx.ok({
        items: normalize(events),
        meta: ctx.state.pageable
    });
};
