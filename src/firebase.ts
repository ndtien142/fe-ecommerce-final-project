// firebase.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { FIREBASE_API } from './config';

const firebaseConfig = {
  apiKey: FIREBASE_API.apiKey,
  authDomain: FIREBASE_API.authDomain,
  projectId: FIREBASE_API.projectId,
  storageBucket: FIREBASE_API.storageBucket,
  messagingSenderId: FIREBASE_API.messagingSenderId,
  appId: FIREBASE_API.appId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
