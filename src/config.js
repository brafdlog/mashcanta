
/* eslint no-undef: "off" */
const isProd = env === 'production';

const COMMON_CONFIG = {
    
};

const DEV_CONFIG = {
    
};

const PROD_CONFIG = {
    
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