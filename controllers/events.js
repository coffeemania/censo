import moment from 'moment';
import {IndexablePage} from '@panderalabs/koa-pageable';
import {Event} from '../models/event';
import {normalize} from '../lib/utils';


/**
 * Get the events
 * @param ctx
 */
export const get = async (ctx) => {

    const filterMapping = {
        id: 'e.id',
        location: 'e.location',
        vehicle: [
            'vehicle.plate',
            'vehicle.model'
        ]
    };

    // TODO
    const pageNumber = ctx.state.pageable.page || 0;
    const pageSize = ctx.state.pageable.size || 10;
    // const sort = ctx.state.pageable.sort;

    const filter = Object.entries(ctx.request.query)
        .filter(([k, v]) => Object.keys(filterMapping).includes(k));


    const {results, total} = await Event.query()
        .alias('e')
        .eager('vehicle')

        .where((builder) =>
            filter.forEach(([k, v]) => {
                const keys = filterMapping[k];
                if (keys.constructor === Array) {
                    let result;
                    keys.forEach(key => {
                        result = !result ?
                            builder.where(key, 'like', `%${v}%`)
                            : result.orWhere(key, 'like', `%${v}%`);
                    });
                } else {
                    builder.where(keys, 'like', `%${v}%`);
                }
            })
        )

        .orderBy('id', 'desc')
        .page(pageNumber, pageSize);

    // .offset((pageNumber - 1) * pageSize)
    // .limit(pageSize)

    const events = results.map((event) => ({
        ...event,
        datetime: moment(event.datetime).format('DD.MM.YYYY HH:mm'),
        statusCheckUrl: process.env.STATUS_CHECK_URL ? `${process.env.STATUS_CHECK_URL}${event.foreignId}` : event.foreignId
    }));

    const result = new IndexablePage(normalize(events), total, ctx.state.pageable);

    ctx.ok(result);

    // ctx.ok({
    //     items: normalize(events),
    //     meta: {
    //         ...ctx.state.pageable,
    //         total
    //     }
    // });
};
