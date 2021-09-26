var schema = require('../schemas/chat_users');

exports.up = function(knex) {
  return knex.schema.createTable('chat_users', schema(knex));
};

exports.down = function(knex) {
  return knex.schema.dropTable('chat_users');
};
