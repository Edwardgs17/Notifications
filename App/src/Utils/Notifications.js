const { sender, serverNotifications } = require('../Config/NotifyConfig');

class Notifications {
  async sendNotifications(deviceToken, title, body, usuario) {
    const message = serverNotifications.Message({
      notification: {
        title,
        body,
      },
      data: {
        usuario,
      },
    });
    const regTokens = [];
    regTokens.push(deviceToken);
    sender.send(message, { registrationTokens: regTokens }, (error, response) => {
      if (error) console.error(error);
      else console.log(response);
    });
  }
}

const notifications = new Notifications();
module.exports = notifications;
