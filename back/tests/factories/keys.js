import Key from '../../src/models/keys.js';
import { authRequest } from '../helpers/request.js';
import defaultKey from '../mocks/key.js';

export const createManyKeys = (amount, token) => {
  const promises = [];
  for (let i = 1; i <= amount; i += 1) {
    const dataCopy = { value: i };
    promises.push(authRequest(token, 'post', '/keys', dataCopy));
  }
  return Promise.all(promises);
};

export const createKey = async (key = defaultKey) => new Key(key).save();
