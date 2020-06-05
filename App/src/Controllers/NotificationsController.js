const log4js = require('../Utils/Logger');
const logUtils = require('../Utils/LogUtils');
const { BaseError } = require('../Utils/ErrorHandler');
const NotificationsService = require('../Services/NotificationsServices');
const Validator = require('../Validators/Validator');
const Schema = require('../Validators/DeviceSchema');
const sendSchema = require('../Validators/SendSchema');


class NotificationsController {
  async sendEmail(req, res, next) {
    const logName = 'Send email user: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { email } = req.params;
    const { body } = req;


    logger.info(`Start NotificationsController.recoverPassword: params ${JSON.stringify(email)}`);


    return NotificationsService.sendEmail(email, body, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }

  async senNotifications(req, res, next) {
    const logName = 'Send notifications user: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;


    logger.info(`Start NotificationsController.notifications: body ${JSON.stringify(body)}`);

    try {
      Validator(sendSchema).validateRequest(body);

      return NotificationsService.sendNotifications(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }


  async createDeviceToken(req, res, next) {
    const logName = 'createDeviceToken';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;
    logger.info(`Stars NotificationsController.createDeviceToken: body ${JSON.stringify(body)}`);

    try {
      Validator(Schema).validateRequest(body);

      return NotificationsService.createDeviceToken(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }


  async updateDeviceToken(req, res, next) {
    const logName = 'updateDeviceToken: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { id } } = req;
    logger.info(`Start updateDeviceToken.update: params ${JSON.stringify(id)}`);
    const { body } = req;
    logger.info(`Start updateDeviceToken.update: params ${JSON.stringify(body)}`);

    try {
      return NotificationsService.updateDeviceToken(id, body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
    } catch (error) {
      return next(error);
    }
  }


  async getToken(req, res, next) {
    const logName = 'getToken';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { id } } = req;


    logger.info(`Stars NotificationsController.getToken : params ${JSON.stringify(id)}`);

    return NotificationsService.getToken(id, { logger, logName })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  }
}

const UsersController = new NotificationsController();
module.exports = UsersController;
