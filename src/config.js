
/* eslint no-undef: "off" */
const isProd = env === 'production';

const COMMON_CONFIG = {
    signInWithRedirect: true,
    showAddMortgageRow: false,
    useFirebaseStorage: true,
    useFirebaseAuth: true,
    firebaseConfig: {
       ***REMOVED***
        authDomain: 'mashcanta.firebaseapp.com',
        databaseURL: 'https://mashcanta.firebaseio.com'
        // storageBucket: "firebase-mashcanta.appspot.com",
    }
};

const DEV_CONFIG = {
    environmentName: 'development',
    storageKeyPrefix: 'test',
   ***REMOVED***
    ravenDSN: 'https://5c5413641aa7467fb952f6aa13c7563e@sentry.io/110422'
};

const PROD_CONFIG = {
    environmentName: 'production',
    storageKeyPrefix: 'prod',
    useFirebaseStorage: true,
    useFirebaseAuth: true,
   ***REMOVED***
    ravenDSN: 'https://173ce8dd688d460a9db8ad21067c45a7@sentry.io/110418'
};

let config;

export function getConfig(key) {
    if (!config) {
        const currentEnvConfig = isProd ? PROD_CONFIG : DEV_CONFIG;
        config = {
            ...COMMON_CONFIG,
            ...currentEnvConfig
        };
    }

    // If looking for a specific configuration
    if (key) {
        return config[key];
    }
    // If not looking for a specifc configuration return the whole config object
    return config;
}