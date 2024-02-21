import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAFPemuEjpdwmO63lvEZcyThEyhAnEn1eM",
  authDomain: "fir-crud-opration.firebaseapp.com",
  databaseURL: "https://fir-crud-opration-default-rtdb.firebaseio.com",
  projectId: "fir-crud-opration",
  storageBucket: "fir-crud-opration.appspot.com",
  messagingSenderId: "1078821462863",
  appId: "1:1078821462863:web:2f6486f1355f91af5a9b3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
