import firebase from '../firebaseInitializer';
import { GOOGLE, FACEBOOK } from '../../consts';

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('email');


export const registerOnAuthChangeHook = (authChangeHook) => {
    firebase.auth().onAuthStateChanged(authChangeHook);
};

export const signIn = (redirect = false, authProviderName = FACEBOOK) => {
    let loginPromise;
    const provider = authProviderName === GOOGLE ? googleProvider : facebookProvider;

    if (redirect) {
        firebase.auth().signInWithRedirect(provider);
    } else {
        loginPromise = firebase.auth().signInWithPopup(provider).then(result => {
            // // This gives you a Google Access Token. You can use it to access the Google API.
            // const token = result.credential.accessToken;
            // // The signed-in user info.
            // const user = result.user;
            // ...
        }).catch(error => {
            // // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // const credential = error.credential;
            // ...
        });
    }

    return loginPromise;
};

export const signOut = () => {
    const signOutPromise = firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }, error => {
        // An error happened.
    });

    return signOutPromise;
};