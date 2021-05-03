export const unauthorizedUser = (message) => ({
  code: 401,
  message,
});

export const entityAlreadyExists = (message) => ({ code: 400, message });

export const entityNotFound = (message) => ({ code: 404, message });

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
