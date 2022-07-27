import mongoose from 'mongoose';

import CONFIG from '../../config';
import logger from '../utils/logger';
import buildCategories from './buildCategories';

async function connect() {
  const { dbUri } = CONFIG;

  try {
    await mongoose.connect(dbUri ?? '');

    /* Inital data for categories */
    await buildCategories();

    logger.info('Database is connected');
  } catch (e) {
    logger.error('Error on connection with database');
    process.exit(1);
  }
}

export default connect;
