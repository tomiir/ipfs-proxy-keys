/* eslint-disable global-require */
import app from './src/app.js';

try {
  app.listen(process.env.PORT);
} catch (error) {
  logger.error(error);
}
