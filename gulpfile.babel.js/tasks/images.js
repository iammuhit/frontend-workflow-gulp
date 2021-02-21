import path from 'path';
import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const config = app.load.config();
const errors = app.errors;

export const copy = () => {
    return gulp.src(config.globs.src.img)
        .pipe(plugins.newer({ dest: config.paths.build.img }))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.img));
};

export const optimize = () => {
    return gulp.src(config.globs.build.img)
        .pipe(plugins.cache(plugins.imagemin(config.images.optimize)))
        .pipe(gulp.dest(config.paths.build.img));
};

export const resize = (callback) => {
    config.images.resize.forEach((transform) => {
        // if folder does not exist create it with all above folders
        if (!plugins.fsExtra.pathExistsSync(transform.dist)) {
            plugins.fsExtra.mkdirsSync(transform.dist, { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
    
        // glob all files
        let files = plugins.glob.sync(transform.src);
    
        // for each file, apply transforms and save to file
        files.forEach((file) => {
            plugins.sharp(file)
                .resize(transform.options)
                .toFile(`${transform.dist}/${path.basename(file)}`)
                .catch(errors.errorHandler);
        });
    });

    callback();
};

export const build = gulp.series(copy);

export const publish = () => {
    plugins.fancyLog('-> Publishing Images');

    return gulp.src(config.globs.dist.img)
        .pipe(plugins.newer({ dest: config.paths.dist.img }))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.dist.img));
};

export const clean = () => plugins.del(config.paths.build.img);

export default { copy, optimize, resize, build, publish, clean };

// Gulp (Tasks)
gulp.task('images:copy', copy);
gulp.task('images:optimize', optimize);
gulp.task('images:resize', resize);
gulp.task('images:build', build);
gulp.task('images:publish', publish);
gulp.task('images:clean', clean);