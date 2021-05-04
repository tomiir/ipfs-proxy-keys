import User from '../models/users.js';
import { encrypt } from './passwords.js';

export default async () => {
  const defaultUser = await User.findOneAndUpdate(
    { email: process.env.DEFAULT_USER },
    { $set: { password: await encrypt(process.env.DEFAULT_PASSWORD) } },
    { upsert: true },
  );
  return defaultUser;
};
