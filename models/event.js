import {Model} from 'objection';

export default class Event extends Model {
    static get tableName() {
        return 'events';
    }
};
