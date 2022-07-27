import express from 'express';
import connect from './database/connect';

import CONFIG from '../config';
import router from './router';
import logger from './utils/logger';
import swaggerDocs from './utils/swagger';

const { port: PORT } = CONFIG;

const app = express();

app.use(express.json());
app.use('/api/v1', router);

app.listen(PORT, async () => {
  logger.info(`The server is running on port ${PORT}`);

  await connect();

  swaggerDocs(app);
});
