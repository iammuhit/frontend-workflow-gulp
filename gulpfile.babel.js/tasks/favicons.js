import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const config = app.load.config();

export const generate = () => {
    plugins.fancyLog('-> Generating favicons');

    return gulp.src(config.paths.favicon.src)
        .pipe(plugins.favicons(config.favicons))
        .pipe(plugins.size({ gzip: false, showFiles: true }))
        .pipe(gulp.dest(config.paths.favicon.dist));
};

export const copy = () => {
    plugins.fancyLog('-> Copying favicon.ico');

    return gulp.src(config.globs.build.favicon)
        .pipe(plugins.newer({ dest: config.paths.build.base }))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.base));
};

export const build = gulp.series(generate, copy);

export const publish = () => {
    plugins.fancyLog('-> Publish favicon.ico');

    return gulp.src(config.globs.dist.favicon)
        .pipe(plugins.newer({ dest: config.paths.dist.base }))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.dist.base));
};

export default { generate, copy, build, publish };

// Gulp (Tasks)
gulp.task('favicons:generate', generate);
gulp.task('favicons:copy', copy);
gulp.task('favicons:build', build);
gulp.task('favicons:publish', publish);