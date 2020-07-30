import app from '../bootstrap/app';

const moment = app.plugins.moment();
const git = new app.plugins.gitRevisionWebpackPlugin();

module.exports.general = [
    '/*!',
    ' * @project    ${ app.name }',
    ' * @author     ${ app.author.name }',
    ' * @website    ${ app.author.website }',
    ' * @build      ' + moment.format('llll') + ' ET',
    ' * @release    ' + git.commithash() + ' [' + git.branch() + ']',
    ' * @copyright  Copyright (c) ' + moment.format('YYYY') + ', ${ app.company.name }',
    ' * @website    ${ app.company.website }',
    ' */',
    ''
].join('\n');

module.exports.webpack = [
    '@project    ${ app.name }',
    '@author     ${ app.author.name }',
    '@website    ${ app.author.website }',
    '@build      ' + moment.format('llll') + ' ET',
    '@release    ' + git.commithash() + ' [' + git.branch() + ']',
    '@copyright  Copyright (c) ' + moment.format('YYYY') + ', ${ app.company.name }',
    '@website    ${ app.company.website }'
].join('\n');