const DB = require('../Utils/Database');

class NotificationsRepositories {
  constructor() {
    this.createDeviceToken = (body) => DB('notification').insert(body).returning('*');
    this.updateDeviceToken = (idToken, body) => DB('notification')
      .where({ idUser: idToken }).update(body).returning('*');
    this.getToken = (id) => DB('notification').select('*').where({ idUser: id }).first();
  }
}

const investmentsRepository = new NotificationsRepositories();
module.exports = investmentsRepository;
