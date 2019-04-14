import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIGlXGNzEETwgovXjHV1xl-3G7uIcwf_0",
  authDomain: "revents-6c685.firebaseapp.com",
  databaseURL: "https://revents-6c685.firebaseio.com",
  projectId: "revents-6c685",
  storageBucket: "revents-6c685.appspot.com",
  messagingSenderId: "367906104513"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
