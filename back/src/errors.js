export const unauthorizedUser = (message) => ({
  code: 401,
  message,
});

export const entityAlreadyExists = (id, entity) => ({ code: 400, message: `The ${entity} with ${id} already exists` });

export const entityNotFound = (id, entity) => ({ code: 404, message: `The ${entity} with ${id} was not found` });

export const tokenExpired = () => ({
  code: 401,
  message: 'Token expired',
});

export const invalidSignature = () => ({
  code: 400,
  message: 'Bad token',
});

export const invalidApiKey = () => ({
  code: 401,
  message: 'The API key is invalid',
});

export const JWT_ERRORS = {
  'jwt expired': (res) => ({ err: tokenExpired('2004'), res }),
  'invalid signature': (res) => ({ err: invalidSignature('2007'), res }),
};
