import health from './controllers/health_check.js';
import { signIn, getUser } from './controllers/users.js';
import { createKey, getKeys, updateKey } from './controllers/keys.js';

import { validateSchemaAndFail } from './middlewares/schema.js';
import authenticate from './middlewares/auth.js';

import signInSchema from './schemas/sign_in.js';
import createKeySchema from './schemas/create_key.js';

export default (app) => {
  app.post('/sign_in', [validateSchemaAndFail(signInSchema)], signIn);
  app.get('/me', [authenticate], getUser);

  app.get('/keys', [authenticate], getKeys);
  app.post('/keys', [authenticate, validateSchemaAndFail(createKeySchema)], createKey);
  app.patch('/keys/:id', [authenticate], updateKey);
  app.get('/health', health);
};
