exports.up = function (knex, Promise) {
    return Promise.all([

        knex.schema.createTable('events', function (table) {
            table.increments('id')
                .primary()
                .unique();

            table.dateTime('datetime')
                .notNullable();

            table.enu('status', ['created', 'sent'])
                .defaultTo('created');

            table.string('foreignId');

            table.string('location')
                .notNullable();

            table.integer('objectId')
                .notNullable();

            // table.foreign('objectId').references('id').inTable('objects');
        }),

        knex.schema.createTable('objects', function (table) {
            table.increments('id')
                .primary()
                .unique();

            table.string('model')
                .notNullable();

            table.string('plate');
        })

        // ...
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.raw('DROP TABLE events CASCADE'),
        knex.schema.raw('DROP TABLE objects CASCADE')
        // ...
    ])
};
