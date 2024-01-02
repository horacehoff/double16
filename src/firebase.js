// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {doc, getDoc, getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3c3ycq40NTSOHM_Upi_R0PEDJyrSzBtA",
    authDomain: "double-16.firebaseapp.com",
    projectId: "double-16",
    storageBucket: "double-16.appspot.com",
    messagingSenderId: "839570141000",
    appId: "1:839570141000:web:bd4d8187d3c0d4366acd7d",
    measurementId: "G-MVR2GCL6JE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const db = getFirestore(app);

export let userdb = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                userdb = docSnap.data()
            }
        })
    }
})
