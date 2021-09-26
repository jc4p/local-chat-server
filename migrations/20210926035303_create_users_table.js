var schema = require('../schemas/users');

exports.up = function(knex) {
  return knex.schema.createTable('users', schema(knex));
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
