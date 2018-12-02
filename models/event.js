import {Model} from 'objection';
import Vehicle from './vehicle';


export default class Event extends Model {
    static get tableName() {
        return 'events';
    }

    static get relationMappings() {
        return {

            vehicle: {
                relation: Model.HasOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'events.vehicleId',
                    to: 'vehicles.id'
                }
            }
        };
    }
}
