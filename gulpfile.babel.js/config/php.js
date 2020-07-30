import app from '../bootstrap/app';

const env = app.helper('general').env;
const paths = app.config('paths');

module.exports = {
    base: paths.build.base,
    hostname: env('SERVER_HOST', 'local.muhit.me'),
    port: Number(env('SERVER_PORT', 8080)),
    keepalive: true
};