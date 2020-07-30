import app from '../bootstrap/app';

const config = {
    app: app.config('app'),
    paths: app.config('paths')
};

module.exports = {
    appName: config.app.name,
    appDescription: config.app.description,
    developerName: config.app.author.name,
    developerURL: config.app.author.website,
    background: '#FFFFFF',
    path: config.paths.favicon.path,
    url: config.app.url,
    display: 'standalone',
    orientation: 'portrait',
    version: config.app.version,
    logging: false,
    online: false,
    html: 'favicons.html',
    pipeHTML: true,
    replace: true,
    icons: {
        android: false, // Create Android homescreen icon. `boolean`
        appleIcon: true, // Create Apple touch icons. `boolean`
        appleStartup: false, // Create Apple startup images. `boolean`
        coast: true, // Create Opera Coast icon. `boolean`
        favicons: true, // Create regular favicons. `boolean`
        firefox: true, // Create Firefox OS icons. `boolean`
        opengraph: false, // Create Facebook OpenGraph image. `boolean`
        twitter: false, // Create Twitter Summary Card image. `boolean`
        windows: true, // Create Windows 8 tile icons. `boolean`
        yandex: true // Create Yandex browser icon. `boolean`
    }
};