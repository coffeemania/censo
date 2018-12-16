import {Model} from 'objection';
import {Vehicle} from './vehicle';
import {AppealHistory} from './appealHistory';


export class Event extends Model {
    static get tableName() {
        return 'events';
    }

    // static get defaultEagerAlgorithm() {
    //     return Model.JoinEagerAlgorithm;
    // }

    // static get defaultEagerOptions() {
    //     return {
    //         minimize: true,
    //         separator: ':',
    //         aliases: {},
    //         joinOperation: 'innerJoin'
    //     };
    // }

    static get relationMappings() {
        return {

            vehicle: {
                relation: Model.HasOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'events.vehicleId',
                    to: 'vehicles.id'
                }
            },
            appealHistory: {
                relation: Model.HasManyRelation,
                modelClass: AppealHistory,
                join: {
                    from: 'events.id',
                    to: 'appeals_history.eventId'
                }
            }
        };
    }
}
