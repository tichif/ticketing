import request from 'supertest';

import { app } from '../../app';
import { signin } from '../../test/authHelper';

it('responses with details with current user', async () => {
  const cookie = await signin();

  const response = await request(app)
    .get('/api/users/current-user')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toBeEqual('test@test.com');
});
