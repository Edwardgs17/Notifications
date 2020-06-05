const knex = require('knex');
const config = require('../Config/Database');

const DB = knex(config);

module.exports = DB;
