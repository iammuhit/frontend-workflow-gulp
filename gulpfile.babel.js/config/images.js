import app from '../bootstrap/app';

const paths = app.config('paths');

module.exports.optimize = {
    progressive: true,
    interlaced: true,
    optimizationLevel: 7,
    svgoPlugins: [{ removeViewBox: false }],
    verbose: true,
    use: []
};

module.exports.resize = [
    {
        src: paths.src.img + 'blog/*',
        dist: paths.build.img + 'blog/_800x600/',
        options: { width: 800, height: 600, fit: 'cover' }
    },
    {
        src: paths.src.img + 'blog/*',
        dist: paths.build.img + 'blog/_400x400/',
        options: { width: 400, height: 400, fit: 'cover' }
    }
];