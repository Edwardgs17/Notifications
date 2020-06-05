const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');


const API2 = '/api/notifications-ms/device';
const API3 = '/api/notifications-ms/devices';


chai.use(chaiHttp);


describe('notify Test one', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });


  it('validation device register error', () => chai
    .request(app)
    .post(`${API2}`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert(error, 400);
    }));

  it('register notify validation error id doesnt exist', () => chai
    .request(app)
    .post(`${API2}`)
    .send({
      idUser: 32424,
      deviceToken: 'asdasdasydgyasgdugasugduas',
    })
    .then(assert.fail)
    .catch((error) => {
      assert(error, 400);
    }));
});

describe('notify Test two', () => {
  const id = 1;

  before(() => Helper.migrate());
  beforeEach(async () => {
    await Helper.clear();
  });

  it('update device validation error', () => chai
    .request(app)
    .put(`${API2}/${id}`)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert(error, 500);
    }));

  it('update device validation succesfull', () => chai
    .request(app)
    .put(`${API2}/${id}`)
    .send({

      deviceToken: 'sadasdasdasdadada',
    })
    .then(assert.fail)
    .catch((error) => {
      assert(error, 200);
    }));


  it('update device sucessfull', async () => {
    const [res] = await Helper.createDeviceToken({

      idUser: 20,
      deviceToken: 'asdoojaposdpaojsdopjapsod',

    });

    return chai
      .request(app)
      .put(`${API2}/${res.id}`)
      .send({
        idUser: 12,
        deviceToken: 'asdoojaposdpaojsdopjapsod',
      })
      .then(assert.fail)
      .catch((error) => {
        assert(error, 200);
      });
  });
});

describe('notify Test third', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('register notify validation required ', () => chai
    .request(app)
    .post(`${API2}/notify`)
    .send({
      idUser: 2,
      deviceToken: 'asdasdasydgyasgdugasugduas',
      title: 'hola',
    })
    .then(assert.fail)
    .catch((error) => {
      assert(error, 400);
    }));

  it('register notify validation undefined token', () => chai
    .request(app)
    .post(`${API2}/notify`)
    .send({
      idUser: 2,
      deviceToken: 'asdasdasydgyasgdugasugduas',
      title: 'hola',
      body: 'asdasdasdsasd',
    })
    .then(assert.fail)
    .catch((error) => {
      assert(error, 500);
    }));

  it('register notify validation route doesnt exist', () => chai
    .request(app)
    .post(`${API2}/notifys`)
    .send({
      idUser: 2,
      deviceToken: 'asdasdasydgyasgdugasugduas',
      title: 'hola',
      body: 'asdasdasdsasd',
    })
    .then(assert.fail)
    .catch((error) => {
      assert(error, 404);
    }));
});

describe('notify Test forth', () => {
  const id = 2;
  const idUsers = 4;

  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('validate error type of data route number', () => chai
    .request(app)
    .get(`${API3}/${id}`)
    .then(assert.fail)
    .catch((error) => {
      assert(error, 500);
    }));

  it('return device by idUser', async () => {
    await Helper.createDeviceToken([{
      idUser: idUsers,
      deviceToken: 'sdfasfafasfsadfpasñfkaskasdds',
    }]);

    return chai
      .request(app)
      .get(`${API3}/${idUsers}`)
      .then(assert.fail)
      .catch((error) => {
        assert(error, 200);
      });
  });

  it('validate error route doesnt exist', () => chai
    .request(app)
    .get(`${API3}/${id}/device`)
    .then(assert.fail)
    .catch((error) => {
      assert(error, 404);
    }));
});
