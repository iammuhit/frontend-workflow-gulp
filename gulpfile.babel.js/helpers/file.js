import path from 'path';

export const basename = (filepath, ext) => path.basename(filepath, ext);
export const extname = (filepath) => path.extname(filepath);
export const filename = (filepath) => path.basename(filepath);

export default { basename, extname, filename };