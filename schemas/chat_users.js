module.exports = function(knex) {

  return function(t){
    t.increments('id').primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());

    t.string('chat_uid', 24).references('chat_uid').inTable('chats').onDelete('CASCADE');
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.string('role');
  };

};
