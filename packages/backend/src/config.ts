import 'dotenv/config';

// PORT
if (!process.env.PORT) throw new Error('Missing PORT environment variable');
if (!/\d+/.test(process.env.PORT)) throw new Error('process.env.PORT is not a number');

const port = parseInt(process.env.PORT);
if (port < 1 || port > 65535) throw new Error(`Invalid port specified - ${port}`);

export { port };

// NODE_ENV
const { NODE_ENV } = process.env;
if (!NODE_ENV) throw new Error('Missing NODE_ENV environment variable');

export { NODE_ENV };
export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_TEST = process.env.NODE_ENV === 'development';

// DB STUFF
const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

if (!MONGO_HOST) throw new Error('Missing MONGO_HOST environment variable');
if (!MONGO_USERNAME) throw new Error('Missing MONGO_USERNAME environment variable');
if (!MONGO_PASSWORD) throw new Error('Missing MONGO_PASSWORD environment variable');

export { MONGO_HOST, MONGO_PASSWORD, MONGO_USERNAME };
