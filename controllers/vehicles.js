import Vehicle from '../models/vehicle';


/**
 * Get the vehicles
 * @param ctx
 */
export const get = async (ctx) => {

    const event = await Vehicle.query();

    ctx.ok(event);
};

