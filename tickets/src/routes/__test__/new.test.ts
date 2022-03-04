import request from 'supertest';

import { app } from '../../app';

it('has a route handler listening on /api/tickets for post request', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can be only accessed if the user is authenticated ', async () => {});

it('returns an error if an invalid title is provided', async () => {});

it('returns an error if an invalid price is provided', async () => {});

it('creates ticket with valid inputs', async () => {});
