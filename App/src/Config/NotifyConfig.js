const serverNotifications = require('node-gcm');

const NotifyConfig = module.exports;

NotifyConfig.sender = serverNotifications.Sender('AIzaSyCdPYTXV2UPXOKbH8DmP3gRRwjXtbk6ORw');

NotifyConfig.serverNotifications = serverNotifications;
