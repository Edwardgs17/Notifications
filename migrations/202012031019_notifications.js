exports.up = (knex) => knex.schema.createTable('notification', (table) => {
  table.increments('id');
  table.string('deviceToken').unsigned().notNullable();
  table.integer('idUser').unsigned().notNullable();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('notification');
