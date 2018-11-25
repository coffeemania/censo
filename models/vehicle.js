import {Model} from 'objection';

export default class Vehicle extends Model {
    static get tableName() {
        return 'vehicles';
    }
};
