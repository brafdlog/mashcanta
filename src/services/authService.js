import * as authNative from './native/authNative';
import { getConfig } from '../config';
import { stateStore } from '../store/StateStore';
import { saveUserDetailsIfDontExist } from './storageService';
import _ from 'lodash';

export const signIn = () => {
    return authNative.signIn();
};

export const signOut = () => {
    return authNative.signOut();
};

export const isAuthEnabled = () => getConfig('useFirebaseAuth');

if (isAuthEnabled()) {
    authNative.registerOnAuthChangeHook(user => {
        if (user) {
            const { uid, displayName } = user;
            const email = _.get(user, 'providerData[0].email');

            const userInfo = {
                id: uid,
                name: displayName,
                email
            };

            // User is signed in
            stateStore.setLoggedInUser(userInfo);
            saveUserDetailsIfDontExist(userInfo);
        } else {
            // No user is signed in
            stateStore.setLoggedOut();
        }
    });
}