import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const config = app.load.config();

export const connect = () => plugins.connectPhp.server(config.php);

export default { connect };

// Gulp (Tasks)
gulp.task('php:connect', connect);