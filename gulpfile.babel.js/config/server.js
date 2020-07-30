import app from '../bootstrap/app';

const env = app.helper('general').env;

module.exports.production = {
    server: {
        baseDir: app.env.PATH_BUILD,
        directory: false,
        index: 'index.html'
    },
    host: env('SERVER_HOST', 'localhost'),
    port: Number(env('SERVER_PORT', 8080)),
    https: Boolean(env('BROWSER_SYNC_HTTPS', false)),
    open: Boolean(env('BROWSER_SYNC_OPEN', false)),
    notify: Boolean(env('BROWSER_SYNC_NOTIFY', false)),
    browser: env('BROWSER_SYNC_BROWSER', 'google chrome')
};

module.exports.development = {
    server: {
        baseDir: app.env.PATH_BUILD,
        directory: false,
        index: 'index.html'
    },
    host: env('SERVER_HOST', 'localhost'),
    port: Number(env('SERVER_PORT', 8080)),
    https: Boolean(env('BROWSER_SYNC_HTTPS', false)),
    open: Boolean(env('BROWSER_SYNC_OPEN', false)),
    notify: Boolean(env('BROWSER_SYNC_NOTIFY', false)),
    browser: env('BROWSER_SYNC_BROWSER', 'google chrome')
};

module.exports.staging = {
    proxy: {
        target: env('SERVER_PROXY', 'local.muhit.me'),
        ws: true
    },
    host: env('SERVER_HOST', 'localhost'),
    port: Number(env('SERVER_PORT', 8080)),
    https: Boolean(env('BROWSER_SYNC_HTTPS', false)),
    open: Boolean(env('BROWSER_SYNC_OPEN', false)),
    notify: Boolean(env('BROWSER_SYNC_NOTIFY', false)),
    browser: env('BROWSER_SYNC_BROWSER', 'google chrome')
};

// Available options: https://browsersync.io/docs/options