const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
const API1 = '/api/notifications-ms/notific';
const email = 'gustavoadolfovilladacamargo@gmail.com';

const emailwrong = 'gustavoadolfovilladacamargoxx@gmail.com';

describe('Notific Test', () => {
  it('Send Email', () => chai
    .request(app)
    .post(`${API1}/${email}`).send({
      password: '3434',
    })
    .then(async (res) => {
      const { body, status } = res;
      assert.equal(status, 200);
      console.log(body);
    }));

  it('Send Email Empty', () => chai
    .request(app)
    .post(`${API1}/`).send({
      password: '3434',
    })
    .then(assert.fail)
    .catch((error) => {
      assert(error, 500);
    }));


  it('Wrong Email Address Test', () => chai
    .request(app)
    .post(`${API1}/${emailwrong}`).send({
      password: '3434',
    })
    .then(assert.fail)
    .catch((error) => {
      assert(error, 401);
    }));


  it('Wrong Email Address twice Test', () => chai
    .request(app)
    .post(`${API1}/${emailwrong}${emailwrong}`).send({
      password: '3434',
    })
    .then(assert.fail)
    .catch((error) => {
      assert(error, 401);
    }));
});
