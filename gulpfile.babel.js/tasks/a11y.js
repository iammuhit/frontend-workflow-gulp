import path from 'path';
import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const helper = app.load.helper('download');
const config = app.load.config();

/**
 * Run pa11y accessibility tests on each template
 */
const processAccessibility = (element, i, callback) => {
    let source = config.urls.critical + element.url;
    let cli = require(path.resolve(config.paths.modules.base, 'pa11y-reporter-cli/lib/reporter.js'));
    let options = {
        log: cli,
        ignore: ['notice', 'warning'],
    };

    plugins.fancyLog('-> Checking Accessibility for URL: ' + plugins.chalk.cyan(source));
    plugins.pa11y(source, options).then(results => {
        let reports = cli.results(results);
        console.log(reports);
        callback();
    });
}

export const accessibility = (callback) => {
    helper.doSynchronousLoop(config.globs.critical, processAccessibility, () => {
        callback();
    });
};

export default { accessibility };

// Gulp (Tasks)
gulp.task('a11y', accessibility);