import request from 'supertest';

import { app } from '../../app';
import { signin } from '../../test/authHelper';

it('has a route handler listening on /api/tickets for post request', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

// it('can be only accessed if the user is authenticated ', async () => {
//   const response = await request(app).post('/api/tickets').send({});

//   expect(response.status).toEqual(401);
// });

it('returns a status other than 401 of the user is signed in', async () => {
  const cookie = signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(422);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      price: 10,
    })
    .expect(422);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: '',
      price: -10,
    })
    .expect(422);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: '',
    })
    .expect(422);
});

it('creates ticket with valid inputs', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'Title',
      price: 20,
    })
    .expect(201);
});
