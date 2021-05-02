import health from './controllers/health_check.js';
import { signIn, getUser } from './controllers/users.js';
import { validateSchemaAndFail } from './middlewares/params.js';

import { authenticateUser as authenticate } from './middlewares/auth.js';
import { signInSchema } from './schemas/index.js';

export default (app) => {
  // web app
  app.get('/health', health);
  app.post('/sign_in', [validateSchemaAndFail(signInSchema)], signIn);
  app.get('/me', [authenticate], getUser);
};
