import path from 'path';
import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const config = app.load.config();
const errors = app.errors;

/**
 * Compile partial .twig files and pass in data from json file matching file name.
 * Example: index.twig - index.twig.json
 */
export const twig = () => {
    return gulp.src(config.globs.src.views)
        .pipe(plugins.plumber({ handleError: errors.errorHandler }))
        .pipe(plugins.data((file) => plugins.fsExtra.readJsonSync(config.paths.src.data + path.basename(file.path) + '.json')))
        .pipe(plugins.twig(config.twig)).on('error', errors.errorHandler)
        .pipe(plugins.prettyHtml(config.html))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.base));
};

export const compile = gulp.series(twig);

export const publish = () => {
    return gulp.src(config.paths.build.base + '*.{html,php}')
        .pipe(plugins.plumber({ handleError: errors.errorHandler }))
        .pipe(plugins.useref())
        .pipe(plugins.if(['**/*.css', '**/!(*.min).js'], plugins.postcss([ plugins.cssnano() ])))
        .pipe(plugins.if(['**/*.css'], plugins.stripComments.text()))
        .pipe(plugins.if(['**/*.css'], plugins.replace('../font/fontello', '../fonts/fontello/font/fontello')))
        .pipe(plugins.if(['**/*.js', '**/!(*.min).js'], plugins.uglifyEs.default()))
        .pipe(plugins.if(['**/*.js'], plugins.stripComments()))
        .pipe(plugins.if(['**/*.html'], plugins.htmlmin({ collapseWhitespace: true })))
        .pipe(plugins.if(['**/*.js', '**/*.css'], plugins.header(config.banner.general, { app: config.app })))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.dist.base));
};

export const clean = () => plugins.del(config.paths.build.base + '*.html');

export default { twig, compile, publish, clean };

// Gulp (Tasks)
gulp.task('views:twig', twig);
gulp.task('views:compile', compile);
gulp.task('views:publish', publish);
gulp.task('views:clean', clean);