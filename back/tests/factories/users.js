import User from '../../src/models/users.js';
import defaultUser from '../mocks/user.js';
import { encrypt } from '../../src/utils/passwords.js';

export default async (user = defaultUser) => new User(
  { ...user, password: await encrypt(user.password) },
).save();
