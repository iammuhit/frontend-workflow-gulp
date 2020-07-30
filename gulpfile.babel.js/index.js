import $ from './bootstrap/app';

const gulp = $.plugins.gulp;

gulp.registry(new $.plugins.hub(['tasks/*.js']));

exports.default = gulp.series('server:watch');
exports.build = gulp.series('clean:build', 'assets:build', 'views:compile', 'server:watch');
exports.publish = gulp.series('assets:publish', 'views:publish');