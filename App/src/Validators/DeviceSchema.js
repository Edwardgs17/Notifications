module.exports = {
  title: 'createDeviceToken',
  type: 'object',
  propertaries: {

    deviceToken: {
      type: 'text',
    },

    idUser: {
      type: 'number',
    },

  },
  required: ['deviceToken', 'idUser'],
};
