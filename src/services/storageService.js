import { getFromStorage, saveToStorage } from './native/storageNative';

export const loadMortgagesFromDB = userId => {
    return getFromStorage(buildStorageKey(userId));
};

export const saveMortgagesToDB = (userId, mortgages) => {
    return saveToStorage(buildStorageKey(userId), mortgages);
};

function buildStorageKey(userId) {
    return `user/${userId}/mortgageInfo`;
}