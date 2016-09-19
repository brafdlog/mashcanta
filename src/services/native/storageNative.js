import { getConfig } from '../../config';
import firebase from '../firebaseInitializer';

const localStorageImpl = {
    getFromStorage: (key) => {
        let infoFromStorage = localStorage.getItem(key);
        infoFromStorage = infoFromStorage && JSON.parse(infoFromStorage);
        return Promise.resolve(infoFromStorage);
    },
    saveToStorage: (key, dataToSave) => {
        const dataJson = JSON.stringify(dataToSave);
        localStorage.setItem(key, dataJson);
        return Promise.resolve();
    }
};

const firebaseStorageImpl = {
    getFromStorage: (key) => {
        const ref = firebase.database().ref(`${getConfig('storageKeyPrefix')}/${key}`);
        const promise = ref.once('value');
        return promise.then(snapshot => snapshot.val());
    },
    saveToStorage: (key, dataToSave) => {
        const ref = firebase.database().ref(`${getConfig('storageKeyPrefix')}/${key}`);
        return ref.set(dataToSave);
    }
};

const storageImpl = getConfig('useFirebaseStorage') ? firebaseStorageImpl : localStorageImpl;

export const getFromStorage = (key) => storageImpl.getFromStorage(key);
export const saveToStorage = (key, dataToSave) => storageImpl.saveToStorage(key, dataToSave);