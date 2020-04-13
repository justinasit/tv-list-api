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

  it('should be able to store shows', async () => {
    const res = await request(app)
      .post('/stored-shows')
      .send([{'id': 1234, seasons_watched: [1]}])
      .set({
        'x-access-token': token,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.shows[0].id).toEqual(1234);
    expect(res.body.shows[0].seasons_watched[0]).toEqual(1);
  });

  it('shouldn\'t be able to store shows with invalid data', async () => {
    const res = await request(app)
      .post('/stored-shows')
      .send({
        shows: 'invalid data',
      })
      .set({
        'x-access-token': token,
      });

    expect(res.statusCode).toEqual(400);
  });

  it('should be able to store archived shows', async () => {
    const res = await request(app)
      .post('/archived-shows')
      .send([{'id': 1234, number_of_seasons: 4, name: 'Walking Dead'}])
      .set({
        'x-access-token': token,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.archivedShows[0].id).toEqual(1234);
    expect(res.body.archivedShows[0].number_of_seasons).toEqual(4);
  });
});