import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const errors = app.errors;
const config = app.load.config();
const webpack = app.load.task('webpack');

export const prismjs = () => {
    plugins.fancyLog('-> Building prism.min.js');

    return gulp.src(config.globs.prismjs)
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.newer({ dest: config.paths.build.js + 'prism.min.js' }))
        .pipe(plugins.concat('prism.min.js'))
        .pipe(plugins.uglifyEs.default())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.js));
};

export const babeljs = () => {
    plugins.fancyLog('-> Transpiling Javascript via Babel');

    return gulp.src(config.globs.src.js)
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.if(['*.js', '!*.min.js'],
            plugins.newer({ dest: config.paths.build.js, ext: '.min.js' }),
            plugins.newer({ dest: config.paths.build.js })
        ))
        .pipe(plugins.babel())
        .pipe(plugins.if(['*.js', '!*.min.js'], plugins.uglifyEs.default()))
        .pipe(plugins.if(['*.js', '!*.min.js'], plugins.rename({ suffix: '.min' })))
        .pipe(plugins.header(config.banner.general, { app: config.app }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.js));
};

export const javascript = () => {
    plugins.fancyLog('-> Building Javascript');

    return gulp.src(config.globs.build.js)
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.newer({ dest: config.paths.build.js, ext: '.js' }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.js));
};

export const browserify = () => {
    plugins.fancyLog('-> Building Javascript via Browserify');

    let stream = plugins.through2();

    stream.on('error', errors.errorHandler)
        .pipe(plugins.vinylSourceStream(config.files.build.es))
        .pipe(plugins.vinylBuffer())
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.stripComments())
        .pipe(plugins.uglifyEs.default())
        .pipe(plugins.header(config.banner.general, { app: config.app }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(plugins.gulp.dest(config.paths.build.js));

    plugins.globby([config.globs.src.esm]).then((entries) => {
        let bundler = plugins.browserify({
            entries: entries,
            debug: true,
            runtimeCompiler: true,
            transform: [ plugins.babelify, plugins.vueify ]
        });
    
        bundler.bundle().pipe(stream);
    }).catch((err) => {
        stream.emit('error', err);
    });

    return stream;
};

export const transpile = gulp.series(babeljs, browserify);

export const bundle = () => {
    plugins.fancyLog('-> Concatenating Javascripts');

    return gulp.src(config.globs.bundle.js)
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.newer({ dest: config.paths.build.js + config.files.build.js }))
        .pipe(plugins.stripComments())
        .pipe(plugins.uglifyEs.default())
        .pipe(plugins.concat(config.files.build.js))
        .pipe(plugins.header(config.banner.general, { app: config.app }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.js));
};

export const minify = () => {
    plugins.fancyLog('-> Minifying Javascripts');

    return gulp.src(config.globs.minify.js)
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.if(['*.js', '!*.min.js'],
            plugins.newer({ dest: config.paths.build.js, ext: '.min.js' }),
            plugins.newer({ dest: config.paths.build.js })
        ))
        .pipe(plugins.if(['*.js', '!*.min.js'], plugins.uglifyEs.default()))
        .pipe(plugins.if(['*.js', '!*.min.js'], plugins.rename({ suffix: '.min' })))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.build.js));
};

export const build = config.app.script.bundler === 'webpack' ? gulp.series(webpack.build, javascript) : 
                     config.app.script.bundler === 'browserify' ? gulp.series(browserify, javascript) : gulp.series(prismjs, babeljs, javascript);

export const publish = () => {
    plugins.fancyLog('-> Publishing Javascripts');

    return gulp.src(config.globs.dist.js)
        .pipe(plugins.plumber({ errorHandler: errors.errorHandler }))
        .pipe(plugins.newer({ dest: config.paths.dist.js, ext: '.min.js' }))
        .pipe(plugins.size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(config.paths.dist.js));
};

export const clean = () => plugins.del(config.paths.build.js);

export default { prismjs, babeljs, javascript, transpile, browserify, bundle, minify, build, publish, clean };

// Gulp (Tasks)
gulp.task('scripts:prismjs', prismjs);
gulp.task('scripts:babeljs', babeljs);
gulp.task('scripts:javascript', javascript);
gulp.task('scripts:browserify', browserify);
gulp.task('scripts:transpile', transpile);
gulp.task('scripts:bundle', bundle);
gulp.task('scripts:minify', minify);
gulp.task('scripts:build', build);
gulp.task('scripts:publish', publish);
gulp.task('scripts:clean', clean);