/* eslint-disable no-undef */
import dotenv from 'dotenv';
import { authRequest, generateToken } from './helpers/request.js';
import user from './mocks/user.js';
import createUser from './factories/users.js';
import { deleteDocumentsFrom } from './helpers/db.js';
import { MODELS } from './helpers/constants.js';
import { initDatabase, mongoose } from '../src/db.js';

let token;

describe('users controller', () => {
  beforeAll(async () => {
    initDatabase();
    dotenv.config();
    await deleteDocumentsFrom(MODELS);
    token = await generateToken();
  });
  afterEach((async () => {
    await deleteDocumentsFrom(MODELS);
    token = await generateToken();
  }));
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('get user', () => {
    test('it should get the user correctly', async () => {
      await createUser(user);
      token = await generateToken();
      const response = await authRequest(token, 'get', '/me');
      expect(response.statusCode).toBe(200);
      expect(response.body.user.email).toEqual(user.email);
    });
  });
});
