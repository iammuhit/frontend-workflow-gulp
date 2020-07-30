import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const paths = app.load.config('paths');

/**
 * Process the downloads one at a time
 * 
 * @param   element object contains url, dest, and path property
 * @param   callback function
 */
export const doDownload = (element, i, callback) => {
    let source = element.url;
    let destination = element.dest;

    plugins.fancyLog('-> Downloading URL: ' + plugins.chalk.cyan(source) + ' -> ' + plugins.chalk.magenta(destination));
    plugins.download(source).pipe(gulp.dest(destination));

    callback();
};

/**
 * Process data in an array synchronously, moving onto the n+1 item only after the nth item callback
 * 
 * @param   data array of objects (properties: url, dest, and path)
 * @param   processData function of downloading process
 * @param   callback function
 */
export const doSynchronousLoop = (data, processData, callback) => {
    if (data.length > 0) {
        let loop = (data, i, processData, callback) => {
            processData(data[i], i, () => {
                if (++i < data.length) {
                    loop(data, i, processData, callback);
                } else {
                    callback();
                }
            });
        };
        loop(data, 0, processData, callback);
    } else {
        callback();
    }
};

export default { doDownload, doSynchronousLoop };