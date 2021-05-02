import jwt from 'jsonwebtoken';

export const encodeLogin = (data,
  expiresIn = process.env.JWT_EXPIRATION_TIME) => jwt.sign(
  { data }, process.env.JWT_SECRET, { expiresIn },
);

export const decodeLogin = (token) => jwt.verify(token, process.env.JWT_SECRET);
