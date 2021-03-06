module.exports = function(knex) {

  return function(t){
    t.increments('id').primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());
    t.dateTime('updated_at').notNull().defaultTo(knex.fn.now());

    t.string('chat_uid', 24).notNull().unique().index();
    t.string('name').notNull();
    t.text('description');
  };

};
