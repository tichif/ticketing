import request from 'supertest';

import { app } from '../../app';

it('test invalid input', async () => {
  return request(app).post('/api/users/signin').send({}).expect(422);
});

it('fails when an email does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'passssss',
    })
    .expect(400);
});

it('set cookie after successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: 'password',
  });

  expect(response.get('Set-Cookie')).toBeDefined();
});
