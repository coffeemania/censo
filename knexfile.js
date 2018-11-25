module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host : 'localhost',
            database: 'censo',
            user: 'root',
            password: '123'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    staging: {},
    production: {}
};
