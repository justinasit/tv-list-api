const request = require('supertest');
const app = require('../app');
 
let token = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/login')
    .send({
      email: 'test.user@test.com',
      password: 'password',
    });

  token = res.headers['x-auth-token'];
});

describe('Shows', () => {
  it('should be able to get shows', async () => {
    const res = await request(app)
      .get('/stored-shows')
      .set({
        'x-access-token': token,
      });

    expect(res.statusCode).toEqual(200);
  });
});