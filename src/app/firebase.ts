import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVMD4elHCiiPhcPNwOIg2u-oT_f5IMVKY",
  authDomain: "recipe-app-3b018.firebaseapp.com",
  projectId: "recipe-app-3b018",
  storageBucket: "recipe-app-3b018.appspot.com",
  messagingSenderId: "314057778532",
  appId: "1:314057778532:web:daf55bd084e41427e14671"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);
export { app, db, auth, storage }