import * as authNative from './native/authNative';
import { getConfig } from '../config';
import { stateStore } from '../store/StateStore';
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
            // User is signed in
            stateStore.setLoggedInUser({
                id: uid,
                name: displayName,
                email
            });
        } else {
            // No user is signed in
            stateStore.setLoggedOut();
        }
    });
}