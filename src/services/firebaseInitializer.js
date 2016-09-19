import { getConfig } from '../config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// This initializer exists to make sure that firebase is only initialized once
if (getConfig('useFirebaseStorage') || getConfig('useFirebaseAuth')) {
    // Init firebase
    const config = getConfig('firebaseConfig');
    firebase.initializeApp(config);
}

export default firebase;