import app from '../bootstrap/app';

const autoprefix = new app.plugins.lessPluginAutoprefix({ browsers: ['last 2 versions'] });

module.exports = {
    plugins: [ autoprefix ]
};