
/* eslint no-undef: "off" */
const isProd = env === 'production';

const COMMON_CONFIG = {
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
    showAddMortgageRow: true,
   ***REMOVED***
};

const PROD_CONFIG = {
    useFirebaseStorage: false,
    useFirebaseAuth: false,
   ***REMOVED***
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