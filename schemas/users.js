module.exports = function(knex) {

  return function(t){
    t.increments('id').primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());
    t.dateTime('updated_at').notNull().defaultTo(knex.fn.now());

    t.string('username').unique().index();
    t.string('password');
  };

};
