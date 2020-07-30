import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const config = app.load.config();
const helper = app.load.helper('download');

/**
 * Download the required css and javascripts from the web
 */
export const externals = (callback) => {
    helper.doSynchronousLoop(config.globs.downloads, helper.doDownload, () => {
        callback();
    });
};

export default { externals };

// Gulp (Tasks)
gulp.task('download:externals', externals);