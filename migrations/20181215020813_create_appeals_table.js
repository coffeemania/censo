exports.up = knex => knex.schema

    .createTable('appeals_history', function (table) {
        table.increments('id').primary().unique();

        table.integer('eventId').notNullable();

        table.dateTime('datetime').notNullable();

        table.string('appealDate', 16);

        table.string('acceptDate', 16);

        table.string('genericId', 32);

        table.string('genericNumber', 32);

        table.text('rawStatus')
            .notNullable();

        table.text('status');

        table.integer('vehicleId')
            .notNullable();
    });


exports.down = knex => knex.schema
        .raw('DROP TABLE appeals_history CASCADE');
