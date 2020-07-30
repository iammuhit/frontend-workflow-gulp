import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const config = app.load.config();

const styles = app.load.task('styles');
const scripts = app.load.task('scripts');
const webpack = app.load.task('webpack');
const fonts = app.load.task('fonts');
const images = app.load.task('images');
const views = app.load.task('views');

const browser = plugins.browserSync.create();
const options = config.server[app.env.APP_ENV];
const reload = (callback) => { browser.reload(); callback(); };

export const sync = (callback) => {
    browser.init(options), callback();
};

export const watch = gulp.series(sync, () => {
    gulp.watch([config.globs.src.scss], gulp.series(styles.scss, views.twig, reload));
    gulp.watch([config.globs.src.less], gulp.series(styles.less, views.twig, reload));
    gulp.watch([config.globs.src.css], gulp.series(styles.css, views.twig, reload));
    gulp.watch([['browserify', 'webpack'].includes(config.app.script.bundler) ? 
        config.paths.src.esm + '**/*.{js,vue}' : config.globs.src.js
    ], gulp.series(scripts.build, views.twig, reload));
    gulp.watch([
        config.paths.src.views + '**/*.{html,twig}',
        config.paths.src.data + '**/*.twig.json'
    ], gulp.series(views.twig, reload));
    gulp.watch([config.globs.src.img], gulp.series(images.build, reload));
    gulp.watch([config.globs.src.fonts], gulp.series(fonts.build, reload));
    gulp.watch([config.paths.src.views + '**/*.php'], gulp.series(reload));
});

export const serve = gulp.series(styles.build, scripts.build, views.twig, watch);

export default { sync, watch, serve };

// Gulp (Tasks)
gulp.task('server:sync', sync);
gulp.task('server:watch', watch);
gulp.task('server:serve', serve);