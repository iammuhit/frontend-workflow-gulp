import path from 'path';
import autoload from './autoload';
import Loader from '../core/Loader';
import Exceptions from '../core/Exceptions';

export const load = new Loader;

export const env = load.config('constants');
export const pkg = require(path.resolve(env.APP_PATH, 'package.json'));
export const plugins = autoload.plugins;
export const errors = new Exceptions;

export const config = (config) => load.config(config);
export const helper = (helper) => load.helper(helper);
export const library = (library) => load.library(library);
export const task = (task) => load.task(task);

export default { load, env, pkg, plugins, errors, config, helper, library, task };