/* eslint-disable import/prefer-default-export */

import User from '../../src/models/users.js';
import defaultUser from '../mocks/user.js';
import { encrypt } from '../../src/utils/passwords.js';

export const createUser = async (user = defaultUser) => new User(
  { ...user, password: await encrypt(user.password) },
).save();
