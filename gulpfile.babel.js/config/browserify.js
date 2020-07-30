module.exports = {
    transform: ['babelify', 'vueify', 'browserify-shim'],
    external: ['lodash', 'jquery', 'vue'],
    bundleExternal: false
};