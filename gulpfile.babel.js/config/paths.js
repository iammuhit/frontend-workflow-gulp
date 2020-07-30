
import app from '../bootstrap/app';

module.exports.root = {
    app: app.env.APP_PATH + '/',
    gulp: app.env.GULP_PATH + '/'
};

module.exports.src = {
    base: app.env.PATH_SRC + '/',
    assets: app.env.PATH_SRC + '/assets/',
    css: app.env.PATH_SRC + '/assets/css/',
    scss: app.env.PATH_SRC + '/assets/scss/',
    less: app.env.PATH_SRC + '/assets/less/',
    js: app.env.PATH_SRC + '/assets/js/',
    esm: app.env.PATH_SRC + '/assets/esm/',
    components: app.env.PATH_SRC + '/assets/esm/components/',
    img: app.env.PATH_SRC + '/assets/img/',
    fontello: app.env.PATH_SRC + '/assets/fonts/fontello/',
    fonts: app.env.PATH_SRC + '/assets/fonts/',
    views: app.env.PATH_SRC + '/views/',
    data: app.env.PATH_SRC + '/data/'
};

module.exports.dist = {
    base: app.env.PATH_DIST + '/',
    assets: app.env.PATH_DIST + '/assets/',
    css: app.env.PATH_DIST + '/assets/css/',
    js: app.env.PATH_DIST + '/assets/js/',
    img: app.env.PATH_DIST + '/assets/img/',
    fonts: app.env.PATH_DIST + '/assets/fonts/'
};

module.exports.build = {
    base: app.env.PATH_BUILD + '/',
    assets: app.env.PATH_BUILD + '/assets/',
    css: app.env.PATH_BUILD + '/assets/css/',
    js: app.env.PATH_BUILD + '/assets/js/',
    img: app.env.PATH_BUILD + '/assets/img/',
    fontello: app.env.PATH_BUILD + '/assets/fonts/fontello/',
    fonts: app.env.PATH_BUILD + '/assets/fonts/',
    html: app.env.PATH_BUILD + '/'
};

module.exports.scss = [];

module.exports.modules = {
    base: app.env.PATH_NODE_MODULES + '/',
    jquery: app.env.PATH_NODE_MODULES + '/jquery/',
    jquery_migrate: app.env.PATH_NODE_MODULES + '/jquery-migrate/',
    popperjs: app.env.PATH_NODE_MODULES + '/popper.js/',
    bootstrap: app.env.PATH_NODE_MODULES + '/bootstrap/',
    prismjs: app.env.PATH_NODE_MODULES + '/prismjs/'
};

module.exports.favicon = {
    src: app.env.PATH_SRC + '/assets/img/favicon.png',
    dist: app.env.PATH_BUILD + '/assets/img/favicons/',
    path: 'assets/img/favicons/'
};