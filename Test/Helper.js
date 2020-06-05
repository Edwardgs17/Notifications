const helpers = module.exports;
const db = require('../App/src/Utils/Database');

helpers.db = db;

helpers.migrate = () => db.migrate.latest();

helpers.clear = async () => {
  await db('notification').del();
};


helpers.createDeviceToken = (body) => db('notification').insert(body).returning('*');
