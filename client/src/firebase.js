
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDoLQGCspjiLZhmtloLPUtrHMAKGeFG6Tk",
    authDomain: "otp-app-demo-ce0e5.firebaseapp.com",
    projectId: "otp-app-demo-ce0e5",
    storageBucket: "otp-app-demo-ce0e5.appspot.com",
    messagingSenderId: "157514526341",
    appId: "1:157514526341:web:0b06f9cc6f63a9b8a943ec"
  };
  // Initialize Firebase  

  firebase.initializeApp(firebaseConfig);
  
export default firebase