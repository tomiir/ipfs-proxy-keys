import User from '../models/users.js';
import { endRequest, catchRequest } from '../helpers/request.js';
import { compare } from '../helpers/passwords.js';
import { entityNotFound } from '../errors.js';
import { encodeLogin as encode } from '../services/session.js';
import signInMapper from '../serializers/users.js';
import mapUser from '../mappers/users.js';
import logger from '../logger.js';

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return catchRequest({ err: entityNotFound(`email ${email}`, 'user', '1032'), res });
  const valid = await compare(password, user.password);
  if (!valid) return catchRequest({ err: entityNotFound(`email ${email}`, 'user', '1032'), res });
  const payload = await encode(user.email);
  res.set('authorization', payload);
  logger.info(`User ${user.email} signed in`);
  return endRequest({
    response: signInMapper({
      token: payload,
    }),
    code: 200,
    res,
  });
};

export const getUser = async (req, res) => {
  const { user } = req;
  return endRequest({
    response: {
      user: mapUser(user),
    },
    code: 200,
    res,
  });
};
