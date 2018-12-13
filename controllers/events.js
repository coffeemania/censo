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

    const allowedFilter = [
        'id', 'location', 'vehicle'
    ];

    // TODO
    const pageNumber = ctx.state.pageable.page || 1;
    const pageSize = ctx.state.pageable.size || 10;
    // const sort = ctx.state.pageable.sort;

    const filter = Object.entries(ctx.request.query)
        .filter(([k, v]) => allowedFilter.includes(k));

    const events = await Event.query()

        .eager('vehicle')
        // .eager('vehicle(filtered)', {
        //     filtered: (query) => {
        //         query
        //             .where('model', 'like', `%${ctx.request.query.vehicle}%`)
        //             .orWhere('plate', 'like', `%${ctx.request.query.vehicle}%`)
        //     }
        // })

        .where((builder) =>
            filter.map(([k, v]) => {
                if (k === 'vehicle') return;    // todo
                return builder.where(k, 'like', `%${v}%`);
            })
        )

        .orderBy('id', 'desc')
        .offset((pageNumber - 1) * pageSize)
        .limit(pageSize)


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
