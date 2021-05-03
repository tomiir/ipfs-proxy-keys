/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import dotenv from 'dotenv';
import { initDatabase, mongoose } from '../src/db.js';
import key from './mocks/key.js';
import { MODELS } from './helpers/constants.js';
import { deleteDocumentsFrom } from './helpers/db.js';
import {
  authRequest, generateToken, publicRequest, request,
} from './helpers/request.js';
import { createManyKeys } from './factories/keys.js';

let token;

describe('keys controller', () => {
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
  describe('create key', () => {
    test('It should create a key with value successfully', async () => {
      const response = await authRequest(token, 'post', '/keys', key);

      expect(response.statusCode).toBe(201);
      expect(response.body.value).toBe(key.value);
      expect(response.body.active).toBe(false);
    });
    test('It should fail because it does not have a value', async () => {
      const response = await authRequest(token, 'post', '/keys', {});
      expect(response.statusCode).toBe(400);
      expect(response.body[0].message).toMatch('Key validation failed: value: Path `value` is required.');
    });
    test('It should fail because there is a key with the same value', async () => {
      await authRequest(token, 'post', '/keys', key);
      const response = await authRequest(token, 'post', '/keys', key);

      expect(response.statusCode).toBe(400);
      expect(response.body[0].message).toMatch('A key with that value already exists');
    });
    test('it does not create the key if user is not authorized', async () => {
      const response = await publicRequest('post', '/keys', key);
      const body = response.body[0];
      expect(response.status).toBe(401);
      expect(body.message).toBe('No token was set');
    });
  });
  describe('get keys', () => {
    test('should get the keys correctly', async () => {
      await createManyKeys(10, token);
      const response = await authRequest(token, 'get', '/keys');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(10);
    });
    test('it does not get the keys if user is not authorized', async () => {
      const response = await request().get('/keys');
      const body = response.body[0];
      expect(response.status).toBe(401);
      expect(body.message).toBe('No token was set');
    });
  });
  describe('update key', () => {
    test('should update an existing key correctly', async () => {
      const { body: newKey } = await authRequest(token, 'post', '/keys', key);
      const response = await authRequest(token, 'patch', `/keys/${newKey._id}`, { active: true, value: 'test' });
      expect(response.statusCode).toBe(201);
      expect(response.body.active).toBe(true);
      expect(response.body.value).toBe('test');
    });
    test('it does not update the key if a key with same value existed', async () => {
      const { body: newKey } = await authRequest(token, 'post', '/keys', { ...key, value: 'test' });
      const response = await authRequest(token, 'patch', `/keys/${newKey._id}`, { active: true, value: 'test' });
      expect(response.statusCode).toBe(400);
      expect(response.body[0].message).toBe('A key with that value already exists');
    });
  });
});
