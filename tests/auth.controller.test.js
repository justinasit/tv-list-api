const request = require('supertest');
const app = require('../app');
import refreshDB from '../setupJest';
 
beforeAll(() => {
  refreshDB();
});

describe('Register', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/user')
      .send({
        name: 'Test User',
        shows: [],
        email: 'test.user@test.com',
        password: 'password',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.headers).toHaveProperty('x-auth-token');
  });

  it('should fail to create a new user', async () => {
    const res = await request(app)
      .post('/user')
      .send({
        shows: [],
        email: 'test.user@test.com',
        password: 'password',
      });
    
    expect(res.statusCode).toEqual(400);
  });
});

describe('Login', () => {
  let token = '';
  it('should be able to login', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test.user@test.com',
        password: 'password',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.headers).toHaveProperty('x-auth-token');
    token = res.headers['x-auth-token'];
  });
  
  it('should fail to login', async () => {
    const res = await request(app)
    .post('/login')
    .send({
      email: 'not.a.user@test.com',
      password: 'password',
    });
    
    expect(res.statusCode).toEqual(400);
  });

  it('should return the logged in user', async () => {
    const res = await request(app)
      .get('/current')
      .set({
        'x-access-token': token,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fail to return the logged in user if no token provided', async () => {
    const res = await request(app)
      .get('/current');

    expect(res.statusCode).toEqual(401);
  });
});