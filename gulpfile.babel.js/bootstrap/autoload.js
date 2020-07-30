import requireDir from 'require-dir';
import Loader from 'gulp-load-plugins';

export const plugins = new Loader({ pattern: ['*'], scope: ['devDependencies'] });

export default { plugins };