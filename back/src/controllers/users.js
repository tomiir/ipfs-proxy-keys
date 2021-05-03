import User from '../models/users.js';
import { endRequest, catchRequest } from '../helpers/request.js';
import { compare } from '../helpers/passwords.js';
import { encodeLogin as encode } from '../services/session.js';
import { signInMapper, userMapper } from '../serializers/users.js';
import logger from '../logger.js';
import { entityNotFound, unauthorizedUser } from '../errors.js';

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return catchRequest({ err: entityNotFound(`The user with email ${email} was not found`), res });
  const passwordMatches = await compare(password, user.password);
  if (!passwordMatches) return catchRequest({ err: unauthorizedUser("Passwords don't match"), res });
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
      user: userMapper(user),
    },
    code: 200,
    res,
  });
};
