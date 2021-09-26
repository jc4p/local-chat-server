var schema = require('../schemas/messages');

exports.up = function(knex) {
  return knex.schema.createTable('messages', schema(knex));
};

exports.down = function(knex) {
  return knex.schema.dropTable('messages');
};
