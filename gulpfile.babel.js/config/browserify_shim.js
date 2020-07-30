module.exports = {
    'jquery': { exports: '$' },
    'jquery-migrate': { depends: 'jquery' },
    'jquery-ui': { depends: ['jquery', 'jquery-migrate'] }
};