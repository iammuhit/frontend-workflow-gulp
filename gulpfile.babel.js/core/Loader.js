import path from 'path';
import fs from 'fs-extra';
import requireDir from 'require-dir';
import constants from '../config/constants';

export default class Loader {

    config(config) {
        return config === undefined ? this._autoload('config') : this._load('config', config);
    }

    helper(helper) {
        return helper === undefined ? this._autoload('helpers') : this._load('helpers', helper);
    }

    library(library) {
        return library === undefined ? this._autoload('libraries') : this._load('libraries', library);
    }

    task(task) {
        return task === undefined ? this._autoload('tasks') : this._load('tasks', task);
    }

    _load(dirname, filename) {
        let extname = '.js';
        let filepath = path.resolve(constants.GULP_PATH, dirname, filename + extname);

        if(fs.pathExistsSync(filepath)) {
            return require(filepath);
        } else {
            console.error('Unable to load the requested file: ' + dirname + '/' + filename + extname);
        }
    }

    _autoload(dirname, options = { recurse: true }) {
        let directory = path.resolve(constants.GULP_PATH, dirname);

        if(fs.pathExistsSync(directory)) {
            return requireDir(directory, options);
        } else {
            console.error('Unable to load the requested directory: ' + dirname);
        }
    }

}