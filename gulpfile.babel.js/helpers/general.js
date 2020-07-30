import Template from 'lodash.template';

export const env = (key, value) => {
    let res = process.env[key] ? process.env[key] : value;

    if (res === 'true') res = true;
    if (res === 'false') res = false;
    if (res === null) res = null;
    if (!isNaN(Number(res))) res = Number(res);

    return res;
};

export const banner = (banner, data) => new Template(banner)(data);

export default { env, banner };