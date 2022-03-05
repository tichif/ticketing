import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { signin } from '../../test/authHelper';

it('returns a 404 if the provided ID does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', signin())
    .send({
      title: 'Title',
      price: 20,
    })
    .expect(404);
});

// it('returns a 401 if the user is not authenticated', async () => {
//   const id = new mongoose.Types.ObjectId().toHexString();
//   await request(app).put(`/api/tickets/${id}`).send({}).expect(401);
// });

it('returns a 401 if the user is not owned the ticket', async () => {
  const responseTicket = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'title',
      price: 20,
      userId: '1234',
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${responseTicket.body.id}`)
    .set('Cookie', signin())
    .send({
      title: 'titleUpdated',
      price: 21,
      userId: '134',
    })
    .expect(401);
});

it('returns a 422 if the user provided invalid title and invalid price', async () => {
  const responseTicket = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'title',
      price: 20,
      userId: '1234',
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${responseTicket.body.id}`)
    .set('Cookie', signin())
    .send({
      title: '',
      price: 20,
      userId: '1234',
    })
    .expect(422);

  await request(app)
    .put(`/api/tickets/${responseTicket.body.id}`)
    .set('Cookie', signin())
    .send({
      title: 'title',
      price: -20,
      userId: '1234',
    })
    .expect(422);
});

it('updated the ticket provided valid inputs', async () => {
  const responseTicket = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'title',
      price: 20,
      userId: '1234',
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${responseTicket.body.id}`)
    .set('Cookie', signin())
    .send({
      title: 'titleUpdated',
      price: 22,
      userId: '1234',
    })
    .expect(200);

  const response = await request(app)
    .get(`/api/tickets/${responseTicket.body.id}`)
    .send({});

  expect(response.body.title).toEqual('titleUpdated');
  expect(response.body.price).toEqual(22);
});
