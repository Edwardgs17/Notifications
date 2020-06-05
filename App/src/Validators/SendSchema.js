module.exports = {
  title: 'createDeviceToken',
  type: 'object',
  propertaries: {

    idUser: {
      type: 'number',
    },

    title: {
      type: 'text',

    },
    body: {
      type: 'text',

    },

  },
  required: ['idUser', 'title', 'body'],
};
