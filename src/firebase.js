import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfWvrv5oYCoYN6FxDUCfNyb_25Po4snSw",
  authDomain: "feedio-socialmedia-app.firebaseapp.com",
  projectId: "feedio-socialmedia-app",
  storageBucket: "feedio-socialmedia-app.appspot.com",
  messagingSenderId: "247146843556",
  appId: "1:247146843556:web:a36e0e2d51e130c9ab4531"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);