import { initDatabase } from './utils/db.js';
import createDefaultUser from './utils/setup.js';
import app from './utils/app_builder.js';

initDatabase();
createDefaultUser();
export default app;
