module.exports = function(knex) {

  return function(t){
    t.increments('id').primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());
    t.dateTime('updated_at').notNull().defaultTo(knex.fn.now());

    t.string('chat_uid', 24).notNull().references('chat_uid').inTable('chats').onDelete('CASCADE').index();
    t.integer('sender').references('id').inTable('users').onDelete('SET NULL');
    t.text('message').notNull();
    t.jsonb('attributes');

  };

};
