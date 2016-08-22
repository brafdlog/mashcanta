
/* eslint no-undef: "off" */
const isProd = env === 'production';

const COMMON_CONFIG = {
    'from.common': 'moo',
    aaaaaa: 'common'
};

const DEV_CONFIG = {
    'from.dev': 'snarf',
    aaaaaa: 'dev'
};

const PROD_CONFIG = {
    'from.prod': 'prod',
    aaaaaa: 'prod'
};

let config;

export function getConfig() {
    if (!config) {
        const currentEnvConfig = isProd ? PROD_CONFIG : DEV_CONFIG;
        config = {
            ...COMMON_CONFIG,
            ...currentEnvConfig
        };
    }
    return config;
}