const readYaml = require('node-read-yaml');
const settings = readYaml.sync('./config/env.yml')

module.exports = {
  client: 'postgresql',
  connection: {
    host:     settings.variables.APP_DB_HOST,
    database: settings.variables.APP_DB_NAME,
    user:     settings.variables.APP_DB_USER,
    password: settings.variables.APP_DB_PASSWORD
  },
  pool: {
    min: 1,
    max: 20
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  }
};
