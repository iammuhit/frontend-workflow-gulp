import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const errors = app.errors;
const config = app.load.config();

export const scss = () => {
    plugins.fancyLog('-> Transpiling scss');
    plugins.sass.compiler = plugins.nodeSass;
    
    return gulp.src(config.globs.src.scss)
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.newer({ dest: config.paths.build.css + config.files.src.css }))
        .pipe(plugins.sass(config.sass).on('error', plugins.sass.logError))
        .pipe(plugins.postcss([ plugins.autoprefixer() ]))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.css));
};

export const less = () => {
    plugins.fancyLog('-> Transpiling less');

    return gulp.src(config.globs.src.less)
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.newer({ dest: config.paths.build.css, ext: '.less.css' }))
        .pipe(plugins.less(config.less))
        .pipe(plugins.postcss([ plugins.autoprefixer() ]))
        .pipe(plugins.rename({ dirname: '.', suffix: '.less' }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.css));
};

export const transpile = gulp.parallel(scss, less);

export const css = () => {
    plugins.fancyLog('-> Building css');

    return gulp.src(config.globs.build.css)
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.newer({ dest: config.paths.build.css, ext: '.css' }))
        .pipe(plugins.print.default())
        .pipe(plugins.postcss([ plugins.autoprefixer() ]))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.css));
};

export const bundle = () => {
    plugins.fancyLog('-> Concatenating css');

    return gulp.src(config.globs.bundle.css)
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.newer({ dest: config.paths.build.css + config.files.build.css }))
        .pipe(plugins.print.default())
        .pipe(plugins.stripComments.text())
        .pipe(plugins.concat(config.files.build.css))
        .pipe(plugins.postcss([ plugins.autoprefixer() ]))
        .pipe(plugins.header(config.banner.general, { app: config.app }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.css));
};

export const minify = () => {
    plugins.fancyLog('-> Minifying css');

    return gulp.src(config.globs.minify.css)
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.if(['*.css', '!*.min.css'],
            plugins.newer({ dest: config.paths.build.css, ext: '.min.css' }),
            plugins.newer({ dest: config.paths.build.css })
        ))
        .pipe(plugins.if(['*.css', '!*.min.css'], plugins.postcss([ plugins.autoprefixer(), plugins.cssnano() ])))
        .pipe(plugins.if(['*.css', '!*.min.css'], plugins.rename({ suffix: '.min' })))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.css));
};

export const build = gulp.series(transpile, css);

export const publish = () => {
    plugins.fancyLog('-> Publishing css');

    return gulp.src(config.globs.dist.css)
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.newer({ dest: config.paths.dist.css, ext: '.min.css' }))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.dist.css));
};

export const clean = () => plugins.del(config.paths.build.css);

export default { scss, less, transpile, css, bundle, minify, build, publish, clean };

// Gulp (Tasks)
gulp.task('styles:scss', scss);
gulp.task('styles:less', less);
gulp.task('styles:transpile', transpile);
gulp.task('styles:css', css);
gulp.task('styles:bundle', bundle);
gulp.task('styles:minify', minify);
gulp.task('styles:build', build);
gulp.task('styles:publish', publish);
gulp.task('styles:clean', clean);