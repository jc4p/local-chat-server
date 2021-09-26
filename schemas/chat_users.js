module.exports = function(knex) {

  return function(t){
    t.increments('id').primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());

    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.integer('chat_id').references('id').inTable('chats').onDelete('CASCADE');
  };

};
