import jwt from 'jsonwebtoken';

export const signin = () => {
  // Build a JWT payload {id, email}
  const payload = {
    id: '12345',
    email: 'test@test.com',
  };

  // create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object
  const session = { jwt: token };

  // turn that session into JSON
  const sessionJson = JSON.stringify(session);

  // take JSON and encode it as base64
  const base64 = Buffer.from(sessionJson).toString('base64');

  // return a string thats the cookie with encoded data
  return [`express:sess=${base64}`];
};
