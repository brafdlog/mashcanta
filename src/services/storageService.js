import { getFromStorage, saveToStorage } from './native/storageNative';

export const loadMortgagesFromDB = userId => {
    const mortgageInfoStorageKey = `${buildStorageKeyPrefix(userId)}/mortgageInfo`;
    return getFromStorage(mortgageInfoStorageKey);
};

export const saveMortgagesToDB = (userId, mortgages) => {
    const mortgageInfoStorageKey = `${buildStorageKeyPrefix(userId)}/mortgageInfo`;
    return saveToStorage(mortgageInfoStorageKey, mortgages);
};

export const saveUserDetailsIfDontExist = userInfoToSave => {
    const userInfoStorageKey = `${buildStorageKeyPrefix(userInfoToSave.id)}/userInfo`;

    // At the moment I don't know if a user is logging in for the first time or not
    // So here I save the user details only if I don't already have them in the DB.
    getFromStorage(userInfoStorageKey).then(userInfo => {
        if (!userInfo) {
            saveToStorage(userInfoStorageKey, userInfoToSave);
        }
    });
};

function buildStorageKeyPrefix(userId) {
    return `user/${userId}`;
}