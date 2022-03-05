import request from 'supertest';

import { app } from '../../app';
import { signin } from '../../test/authHelper';

const createTickets = () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'Title',
      price: 20,
      userId: '1234',
    })
    .expect(201);
};

it('can fetch a list of tickets', async () => {
  await createTickets();
  await createTickets();
  await createTickets();

  const response = await request(app).get('/api/tickets').send({}).expect(200);

  expect(response.body.length).toEqual(3);
});
