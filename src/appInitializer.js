import { autorun } from 'mobx';
import { stateStore, USER_LOGGED_IN } from './store/StateStore';
import { loadMortgagesFromDB, saveMortgagesToDB } from './services/storageService';

autorun('Save to storage on change', () => {
    // We don't want to save before we fetcehd the user's data from db so we don't override it by mistake.
    if (stateStore.userStatus === USER_LOGGED_IN && stateStore.fetchedUserDataFromDb) {
        const mortgagesToSave = stateStore.mortgages.map(mortgage => mortgage.persistableObject);
        saveMortgagesToDB(stateStore.user.id, mortgagesToSave);
    }
});
autorun('Get user data from db', () => {
    if (stateStore.userStatus === USER_LOGGED_IN) {
        loadMortgagesFromDB(stateStore.user.id).then(storedMortgageInfo => {
            stateStore.setMortgages(storedMortgageInfo);
        });
    }
});