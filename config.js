import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {

    apiKey: "AIzaSyA87b1GsVlXXbCuW7T3_qYNATylb7T7Ar4",
  
    authDomain: "biblioteca-eletronica-79071.firebaseapp.com",
  
    projectId: "biblioteca-eletronica-79071",
  
    storageBucket: "biblioteca-eletronica-79071.appspot.com",
  
    messagingSenderId: "931307271707",
  
    appId: "1:931307271707:web:e54212b6daec1a3517aabe"
  
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db