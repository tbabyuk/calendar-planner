
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDGHYxni4FhLTilgr-xV2J1EMia8TZYa9I",
    authDomain: "calendar-planner-ede2d.firebaseapp.com",
    projectId: "calendar-planner-ede2d",
    storageBucket: "calendar-planner-ede2d.appspot.com",
    messagingSenderId: "242299831591",
    appId: "1:242299831591:web:00faaa3f70555baf4a5502"
  };


// init app
const app = initializeApp(firevbaseConfig);

// connect to firestore
const db = getFirestore(app)