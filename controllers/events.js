import moment from 'moment';
import Event from '../models/event';
import {normalize} from '../lib/utils';


/**
 * Get the events
 * @param ctx
 */
export const get = async (ctx) => {

    const filterMapping = {
        // id: 'id',
        location: 'location',
        vehicle: [
            'vehicle.plate',
            'vehicle.model'
        ]
    };

    // TODO
    const pageNumber = ctx.state.pageable.page || 1;
    const pageSize = ctx.state.pageable.size || 10;
    // const sort = ctx.state.pageable.sort;

    const filter = Object.entries(ctx.request.query)
        .filter(([k, v]) => Object.keys(filterMapping).includes(k));


    const events = await Event.query()

        .eager('vehicle')

        .where((builder) =>
            filter.map(([k, v]) => {
                const keys = filterMapping[k];
                if (keys.constructor === Array) {
                    let result;
                    keys.forEach(key => {
                        result = !result ?
                            builder.where(key, 'like', `%${v}%`)
                            : result.orWhere(key, 'like', `%${v}%`);
                    });
                    return result;
                }
                return builder.where(keys, 'like', `%${v}%`);
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
