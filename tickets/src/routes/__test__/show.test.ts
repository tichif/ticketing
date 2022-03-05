import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { signin } from '../../test/authHelper';

it('returns 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'Title',
      price: 20,
      userId: '1234',
    })
    .expect(201);

  const responseTicket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(responseTicket.body.title).toEqual('Title');
  expect(responseTicket.body.price).toEqual(20);
});
