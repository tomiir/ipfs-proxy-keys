import { inspect } from 'util';
import logger from '../logger.js';

const setHeaders = (res, headers = {}) => Object.entries(headers).forEach(
  (header) => res.header(...header),
);

const setAttachment = (res, file = undefined) => file && res.attachment(file);

export const endRequest = ({
  response = undefined, code, res, headers = {}, file = undefined,
}) => {
  setHeaders(res, headers);
  setAttachment(res, file);
  return (response
    ? res.status(code).send(response)
    : res.status(code).end());
};

export const catchRequest = ({
  err, res, message = 'Server Error',
}) => {
  logger.error(inspect(err, { showHidden: false, depth: null }));
  return res.status((err && err.code) || 503).json([{
    message: (err && err.message) || message,
  }]);
};
