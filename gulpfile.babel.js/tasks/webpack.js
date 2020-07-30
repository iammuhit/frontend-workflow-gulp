import webpack from 'webpack';
import app from '../bootstrap/app';

const gulp = app.plugins.gulp;
const config = app.load.config('webpack');

/**
 * Build scripts using webpack and config (lint, transpile, concat)
 */
export const build = () => {
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            let info = stats.toJson();
            
            if (err) return reject(err);
            if (stats.hasErrors()) return reject(info.errors);
            if (stats.hasWarnings()) return reject(info.warnings);
    
            console.log(stats.toString({
                chunks: false, // makes the build much quieter
                colors: true, // shows colors in the console
            }));
    
            resolve();
        });
    });
};

export default { build };

// Gulp (Tasks)
gulp.task('webpack:build', build);