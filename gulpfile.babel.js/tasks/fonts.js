import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const config = app.load.config();

export const generate = () => {
    return gulp.src(config.paths.src.fonts + 'config.json')
        .pipe(plugins.fontello())
        .pipe(plugins.print.default())
        .pipe(plugins.size({ gzip: false, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.fontello))
};

export const copy = () => {
    return gulp.src(config.globs.build.fonts)
        .pipe(plugins.newer({ dest: config.paths.build.fonts }))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.fonts));
};

export const build = gulp.series(generate, copy);

export const publish = () => {
    plugins.fancyLog('-> Publishing Fonts');

    return gulp.src(config.globs.dist.fonts)
        .pipe(plugins.newer({ dest: config.paths.dist.fonts }))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.dist.fonts));
};

export const clean = () => plugins.del(config.paths.build.fonts);

export default { generate, copy, build, publish, clean };

// Gulp (Tasks)
gulp.task('fonts:generate', generate);
gulp.task('fonts:copy', copy);
gulp.task('fonts:build', build);
gulp.task('fonts:publish', publish);
gulp.task('fonts:clean', clean);