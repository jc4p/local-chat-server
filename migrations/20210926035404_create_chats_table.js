var schema = require('../schemas/chats');

exports.up = function(knex) {
  return knex.schema.createTable('chats', schema(knex));
};

exports.down = function(knex) {
  return knex.schema.dropTable('chats');
};
