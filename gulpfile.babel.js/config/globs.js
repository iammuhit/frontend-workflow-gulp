import app from '../bootstrap/app';

const paths = app.config('paths');
const files = app.config('files');

module.exports.downloads = [
    { url: 'https://www.google-analytics.com/analytics.js', dest: paths.build.js },
    { url: 'https://static.small.chat/messenger.css', dest: paths.build.css },
    { url: 'https://static.small.chat/messenger.js', dest: paths.build.js }
];

module.exports.src = {
    scss: paths.src.scss + '**/*.scss',
    less: paths.src.less + '**/*.less',
    css: paths.src.css + '**/*.css',
    js: paths.src.js + '**/*.js',
    esm: paths.src.esm + '*.js',
    img: paths.src.img + '**/*.{png,jpg,jpeg,gif,svg,ico}',
    fonts: paths.src.fonts + '**/*.{json,eot,ttf,otf,woff,woff2}',
    views: paths.src.views + '*.twig'
};

module.exports.build = {
    css: [
        paths.modules.bootstrap + 'dist/css/bootstrap.min.css',
        paths.modules.base + 'font-awesome/css/font-awesome.min.css',
        paths.modules.base + 'animate.css/animate.min.css',
        paths.modules.base + '@fancyapps/fancybox/dist/jquery.fancybox.min.css',
        paths.src.css + '**/*.css'
    ],
    js: [
        paths.modules.jquery + 'dist/jquery.min.js',
        paths.modules.jquery_migrate + 'dist/jquery-migrate.min.js',
        paths.modules.popperjs + 'dist/umd/popper.min.js',
        paths.modules.bootstrap + 'dist/js/bootstrap.min.js',
        paths.modules.base + 'lodash/lodash.min.js',
        paths.modules.base + 'vue/dist/vue.min.js',
        paths.modules.base + 'jquery.smooth-scroll/jquery.smooth-scroll.min.js',
        paths.modules.base + '@fancyapps/fancybox/dist/jquery.fancybox.min.js',
        paths.modules.base + 'holderjs/holder.min.js'
    ],
    img: [
        paths.build.img + '**/*.{png,jpg,jpeg,gif,svg}'
    ],
    fonts: [
        paths.modules.base + 'font-awesome/fonts/*.{eot,ttf,otf,woff,woff2}',
        paths.src.fonts + '**/*.{eot,ttf,otf,woff,woff2}'
    ],
    favicon: paths.build.img + 'favicons/favicon.ico',
    html: paths.build.html + '*.html'
};

module.exports.dist = {
    css: paths.build.css + '**/*.{min.css,bundle.css}',
    js: paths.build.js + '**/*.{min.js,bundle.js}',
    img: paths.build.img + '**/*.{png,jpg,jpeg,gif,svg,ico}',
    fonts: [
        paths.build.fonts + '**/*.{eot,ttf,otf,woff,woff2}',
        paths.build.fonts + '**/fontello.css'
    ],
    favicon: paths.build.img + 'favicons/favicon.ico'
};

module.exports.bundle = {
    css: [
        paths.modules.bootstrap + 'dist/css/bootstrap.min.css',
        paths.modules.base + 'font-awesome/css/font-awesome.min.css',
        paths.modules.base + 'animate.css/animate.min.css',
        paths.modules.base + '@fancyapps/fancybox/dist/jquery.fancybox.min.css',
        paths.src.css + '**/*.css',
        paths.build.css + 'app.css'
    ],
    js: [
        paths.modules.jquery + 'dist/jquery.min.js',
        paths.modules.jquery_migrate + 'dist/jquery-migrate.min.js',
        paths.modules.base + 'popper.js/dist/umd/popper.min.js',
        paths.modules.base + 'bootstrap/dist/js/bootstrap.min.js',
        paths.modules.base + 'jquery.smooth-scroll/jquery.smooth-scroll.min.js',
        paths.modules.base + '@fancyapps/fancybox/dist/jquery.fancybox.min.js',
        paths.modules.base + 'holderjs/holder.min.js',
        paths.build.js + 'app.min.js'
    ]
};

module.exports.minify = {
    css: paths.build.css + '**/!(*.min).css',
    js: paths.build.js + '**/!(*.min).js'
};

module.exports.prismjs = [
    paths.modules.prismjs + 'prism.js',
    paths.modules.prismjs + 'components/prism-markup.js',
    paths.modules.prismjs + 'components/prism-apacheconf.js',
    paths.modules.prismjs + 'components/prism-css.js',
    paths.modules.prismjs + 'components/prism-json.js',
    paths.modules.prismjs + 'components/prism-twig.js',
    paths.modules.prismjs + 'components/prism-php.js',
    paths.modules.prismjs + 'components/prism-bash.js',
    paths.modules.prismjs + 'components/prism-javascript.js',
    paths.modules.prismjs + 'plugins/line-numbers/prism-line-numbers.min.js'
];

module.exports.critical = [
    { url: '', template: 'index' },
    { url: 'blog', template: 'blog/index' },
    { url: '404', template: '404' }
];