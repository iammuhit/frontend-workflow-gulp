import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const config = app.load.config();

const download = app.load.task('download');
const favicons = app.load.task('favicons');
const fonts = app.load.task('fonts');
const styles = app.load.task('styles');
const scripts = app.load.task('scripts');
const images = app.load.task('images');

export const build = gulp.series(download.externals, gulp.parallel(favicons.build, fonts.build, styles.build, scripts.build), images.build);
export const publish = gulp.parallel(favicons.publish, images.publish, fonts.publish, styles.publish, scripts.publish);
export const clean = () => plugins.del(config.paths.build.assets + '**');

export default { build, publish, clean };

// Gulp (Tasks)
gulp.task('assets:build', build);
gulp.task('assets:publish', publish);
gulp.task('assets:clean', clean);