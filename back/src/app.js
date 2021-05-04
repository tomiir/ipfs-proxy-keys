import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs.js';
import { initDatabase } from './utils/db.js';
import createDefaultUser from './utils/setup.js';
import app from './utils/app_builder.js';

import './services/rollbar.js';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

initDatabase();
createDefaultUser();
export default app;
