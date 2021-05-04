import { decodeLogin } from '../services/session.js';
import User from '../models/users.js';
import { catchRequest } from '../helpers/request.js';

import { unauthorizedUser, JWT_ERRORS } from '../utils/errors.js';

const authenticate = async (req, res, next, decode) => {
  const authHeader = req.headers[process.env.JWT_HEADER_NAME];
  if (!authHeader) return catchRequest({ err: unauthorizedUser('No token was set'), res });
  const authSplitted = authHeader.split(' ');
  if (authSplitted[0] !== 'Bearer') return catchRequest({ err: unauthorizedUser('Bad header token'), res });
  const token = authSplitted[1];
  if (!token) return catchRequest({ err: unauthorizedUser('Bad header token'), res });
  try {
    const email = await decode(token).data;
    const user = await User.findOne({ email }).select({ password: 0 });
    if (!user) return catchRequest({ err: unauthorizedUser('No user found'), res });
    req.user = user;
    return next();
  } catch (err) {
    return err && err.message && JWT_ERRORS[err.message]
      ? catchRequest(JWT_ERRORS[err.message](res))
      : catchRequest({ err, res });
  }
};

export default (req, res, next) => authenticate(
  req, res, next, decodeLogin,
);
