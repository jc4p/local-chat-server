module.exports = function(knex) {

  return function(t){
    t.increments('id').primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());
    t.dateTime('updated_at').notNull().defaultTo(knex.fn.now());

    t.integer('chat_id').notNull().references('id').inTable('chats').onDelete('CASCADE').index('message_chat_id_index', 'HASH');
    t.text('message').notNull();
    t.jsonb('attributes');

  };

};
