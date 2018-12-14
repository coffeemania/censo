import {Vehicle} from '../models/vehicle';
import {normalize} from '../lib/utils';


/**
 * Get the vehicles
 * @param ctx
 */
export const get = async (ctx) => {

    const event = await Vehicle.query();

    ctx.ok(normalize(event));
};

