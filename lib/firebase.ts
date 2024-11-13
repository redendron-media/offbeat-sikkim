
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuQ74e1pjfJP0R1bkz2JxDRdGJojfVPSA",
  authDomain: "offbeat-website.firebaseapp.com",
  projectId: "offbeat-website",
  storageBucket: "offbeat-website.firebasestorage.app",
  messagingSenderId: "242201360896",
  appId: "1:242201360896:web:f1101a4c2742a91c0736e5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };