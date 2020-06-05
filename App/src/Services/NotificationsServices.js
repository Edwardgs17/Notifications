const log4js = require('../Utils/Logger');

const defaultLogger = log4js.getLogger('NotificationsServices');
const Emailsend = require('../Utils/email');
const Notificationsend = require('../Utils/Notifications');
const NotificationsRepository = require('../Repositories/NotificationsRepository');


class NotificationsServices {
  async sendEmail(email, body, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start NotificationsService.recoverPassword: params ${JSON.stringify(email)}`);
    console.log({ body });
    const resp = await Emailsend(email, body.password);
    console.log({ resp });

    return resp;
  }

  async sendNotifications(notify, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start NotificationsService.notifications: body ${JSON.stringify(notify)}`);
    console.log({ notify });

    const {
      idUser, title, body,
    } = notify;

    const { deviceToken } = await NotificationsRepository.getToken(idUser);
    console.log({ deviceToken, idUser });

    const resp = await Notificationsend.sendNotifications(deviceToken, title, body, 'usuario');

    return resp;
  }

  async createDeviceToken(body, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Stars NotificationsService.createDeviceToken: params ${JSON.stringify(body)}`);

    const resp = await NotificationsRepository.createDeviceToken(body);

    return resp;
  }

  async updateDeviceToken(id, body, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Stars NotificationsService.updateDeviceToken: params ${JSON.stringify(id)}`);

    const resp = await NotificationsRepository.updateDeviceToken(id, body);

    return resp;
  }

  async getToken(id, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Stars NotificationsService.getToken: params ${JSON.stringify(id)}`);

    const resp = await NotificationsRepository.getToken(id);

    return resp;
  }
}
const UserService = new NotificationsServices();
module.exports = UserService;
