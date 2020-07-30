import path from 'path';
import dotenv from 'dotenv';
import dotenvParse from 'dotenv-parse-variables';

const ENV = dotenvParse(dotenv.config().parsed);

const BASE_PATH = process.env.BASE_PATH = path.resolve(__dirname, '../../');
const GULP_PATH = process.env.GULP_PATH = path.resolve(__dirname, '../');

const ENV_DEVELOPMENT = process.env.ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = process.env.ENV_PRODUCTION = 'production';

const NODE_ENV = ([ENV_DEVELOPMENT, ENV_PRODUCTION].includes(process.env.NODE_ENV)) ? process.env.NODE_ENV : undefined;
const APP_ENV = (NODE_ENV !== undefined) ? process.env.NODE_ENV : process.env.APP_ENV;

process.env.APP_ENV = process.env.NODE_ENV = (APP_ENV !== undefined) ? APP_ENV : ENV_DEVELOPMENT;

process.env.APP_PATH = BASE_PATH;
process.env.GULP_PATH = GULP_PATH;

process.env.PATH_SRC = path.resolve(BASE_PATH, 'src');
process.env.PATH_BUILD = path.resolve(BASE_PATH, 'build');
process.env.PATH_DIST = path.resolve(BASE_PATH, 'public');
process.env.PATH_NODE_MODULES = path.resolve(BASE_PATH, 'node_modules');

process.env.PATH_SRC_ASSETS = path.resolve(BASE_PATH, 'src/assets');
process.env.PATH_BUILD_ASSETS = path.resolve(BASE_PATH, 'build/assets');
process.env.PATH_DIST_ASSETS = path.resolve(BASE_PATH, 'public/assets');

module.exports = process.env;