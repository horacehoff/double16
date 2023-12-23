// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);