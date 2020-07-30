import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const plugins = app.plugins;
const config = app.load.config();

export const build = () => plugins.del([
    `${config.paths.build.base}/*.*`,
    `${config.paths.build.assets}/**`,
    `!${config.paths.build.base}/*.gitkeep`,
    `!${config.paths.build.assets}`,
    `!${config.paths.build.assets}/img`
]);

export const dist = () => plugins.del([
    `${config.paths.dist.base}/*.*`,
    `${config.paths.dist.assets}/**`,
    `!${config.paths.dist.base}/*.gitkeep`,
    `!${config.paths.dist.assets}`,
    `!${config.paths.dist.assets}/img`
]);

export const clean = () => plugins.del([
    `${config.paths.build.base}/**`,
    `${config.paths.dist.base}/**`,
    `!${config.paths.build.base}/*.gitkeep`,
    `!${config.paths.dist.base}/*.gitkeep`
]).then((callback) => plugins.cache.clearAll(callback));

export const cache = (callback) => plugins.cache.clearAll(callback);

export default { build, dist, clean, cache }

// Gulp (Tasks)
gulp.task('clean:build', build);
gulp.task('clean:dist', dist);
gulp.task('clean:cache', cache);
gulp.task('clean', clean);