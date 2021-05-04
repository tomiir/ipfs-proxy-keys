/* eslint-disable no-undef */
import dotenv from 'dotenv';
import { publicRequest } from './helpers/request.js';
import user from './mocks/user.js';
import createUser from './factories/users.js';
import { deleteDocumentsFrom } from './helpers/db.js';
import { MODELS } from './helpers/constants.js';
import { decodeLogin as decode } from '../src/services/session.js';
import { initDatabase, mongoose } from '../src/utils/db.js';

describe('sessions', () => {
  beforeAll(async () => {
    dotenv.config();
    initDatabase();
    await deleteDocumentsFrom(MODELS);
  });
  afterEach((async () => {
    await deleteDocumentsFrom(MODELS);
  }));
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('sign in', () => {
    describe('existing user', () => {
      test('It should have a successful response signing in', async () => {
        await createUser();
        const response = await publicRequest('post', '/sign_in', { email: user.email, password: user.password });
        expect(response.statusCode).toBe(200);
        expect(response.body.expirationTime).toBe('1h');
        const { token } = response.body;
        const email = await decode(token).data;
        expect(email).toEqual(user.email);
      });
      test('It should fail because of wrong email', async () => {
        await createUser();
        const response = await publicRequest('post', '/sign_in', { email: 'fake@fake.com', password: user.password });
        expect(response.statusCode).toBe(404);
        expect(response.body[0].message).toBe('The user with email fake@fake.com was not found');
      });
      test('It should fail because of wrong password', async () => {
        await createUser();
        const response = await publicRequest('post', '/sign_in', { email: user.email, password: '1234' });
        expect(response.statusCode).toBe(401);
        expect(response.body[0].message).toBe("Passwords don't match");
      });
      test('It should fail because of no password was sent', async () => {
        await createUser();
        const response = await publicRequest('post', '/sign_in', { email: user.email });
        expect(response.statusCode).toBe(400);
        expect(response.body[0].message).toBe('password must be present and should be a string');
      });
    });
  });
  describe('authenticated routes', () => {
    describe('user routes', () => {
      test('It should be authenticated as user if ask for actives details', async () => {
        const response = await publicRequest('get', '/me');
        expect(response.statusCode).toBe(401);
        expect(response.body[0].message).toBe('No token was set');
      });
    });
  });
});
