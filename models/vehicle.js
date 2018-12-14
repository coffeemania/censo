import {Model} from 'objection';

export class Vehicle extends Model {
    static get tableName() {
        return 'vehicles';
    }
}
