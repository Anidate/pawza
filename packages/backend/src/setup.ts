import mongoose from 'mongoose';

import { MONGO_DB, MONGO_HOST, MONGO_PASSWORD, MONGO_USERNAME } from './config.js';
import { logger } from './logger.js';

mongoose.connection.on('open', () => logger.info('MongoDb Connected'));
mongoose.connection.on('disconnected', () => logger.error('MongoDb Disconnected'));

export const setup = async () => {
  const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;
  await mongoose.connect(uri);
};

export const teardown = async () => {
  await mongoose.disconnect();
};
