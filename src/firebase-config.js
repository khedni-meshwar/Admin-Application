import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB27k-nGVSr7Wd0z4LpH6Du9U0f09jqV_0",
    authDomain: "khednimeshwar.firebaseapp.com",
    projectId: "khednimeshwar",
    storageBucket: "khednimeshwar.appspot.com",
    messagingSenderId: "984409332819",
    appId: "1:984409332819:web:3e7da4e69113d3a7a53aa6",
    measurementId: "G-N1T1LS05WP"
};

const fire = initializeApp(firebaseConfig);

export default fire;