import supertest from 'supertest';
import app from '../../src/app.js';
import user from '../mocks/user.js';
import { createUser } from '../factories/users.js';

export const request = () => supertest(app);

const requestBuilder = (headers) => async (method, path, body = {}) => {
  const newRequest = supertest(app)[method](path);
  headers.forEach(({ header, content }) => newRequest.set(header, content));
  return newRequest.send(body);
};

export const generateToken = async (email = 'hi@hi.com') => {
  await createUser({ ...user, email });
  return supertest(app)
    .post('/sign_in')
    .send({ email, password: user.password })
    .then((res) => res.body.token);
};

export const publicRequest = (method, path, body) => requestBuilder([{ header: 'Accept', content: 'application/json' }])(method, path, body);

export const authRequest = (token, method, path, body) => requestBuilder([{ header: 'authorization', content: `Bearer ${token}` }, { header: 'Accept', content: 'application/json' }])(method, path, body);
