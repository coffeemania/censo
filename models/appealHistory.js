import {Model} from 'objection';

export class AppealHistory extends Model {
    static get tableName() {
        return 'appeals_history';
    }
}
