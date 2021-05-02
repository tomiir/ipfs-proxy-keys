import health from './controllers/health_check.js';
import { signIn, getUser } from './controllers/users.js';
import { validateSchemaAndFail } from './middlewares/schema.js';

import authenticate from './middlewares/auth.js';
import signInSchema from './schemas/sign_in.js';

export default (app) => {
  // web app
  app.get('/health', health);
  app.post('/sign_in', [validateSchemaAndFail(signInSchema)], signIn);
  app.get('/me', [authenticate], getUser);
};
