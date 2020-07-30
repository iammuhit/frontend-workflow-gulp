import App from '../bootstrap/app';

const paths = App.config('paths');

module.exports = { 
    includePaths: paths.scss,
    outputStyle: 'expanded', // nested | expanded | compact | compressed
    indentType: 'tab', // space | tab
    indentWidth: 1
};

// Available Options: https://github.com/sass/node-sass#options