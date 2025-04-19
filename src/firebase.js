// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt9Z_gQ6Pp9vDgc_zgbLPxA7O-rQHByvU",
  authDomain: "mindsync-169.firebaseapp.com",
  projectId: "mindsync-169",
  storageBucket: "mindsync-169.firebasestorage.app",
  messagingSenderId: "1075331044155",
  appId: "1:1075331044155:web:260c7f3ce358fef3f55d1e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
