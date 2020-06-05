const { Router } = require('express');
const NotificationsController = require('../Controllers/NotificationsController');


class NotificationsRouter {
  constructor() {
    this.notificationsRouter = Router();
    this.config();
  }


  config() {
    this.notificationsRouter.post('/notific/:email', NotificationsController.sendEmail);
    this.notificationsRouter.post('/device/notify', NotificationsController.senNotifications);
    this.notificationsRouter.post('/device', NotificationsController.createDeviceToken);
    this.notificationsRouter.put('/device/:id', NotificationsController.updateDeviceToken);
    this.notificationsRouter.get('/devices/:id', NotificationsController.getToken);
  }
}

const router = new NotificationsRouter();
module.exports = router.notificationsRouter;
