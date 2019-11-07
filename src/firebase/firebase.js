import firebase from 'firebase/app';
import 'firebase/storage';


var config = {
    apiKey: "AIzaSyAysh8VQQglENZSUy8U2-OW2GzRtrqgU_0",
    authDomain: "portfolio-app-98dc3.firebaseapp.com",
    databaseURL: "https://portfolio-app-98dc3.firebaseio.com",
    projectId: "por tfolio-app-98dc3",
    storageBucket: "portfolio-app-98dc3.appspot.com",
    messagingSenderId: "411993848151",
    appId: "1:411993848151:web:7cbbbd6727c83420fa2612",
    measurementId: "G-Y3H3P4G8BV"
}
firebase.initializeApp(config)

const storage = firebase.storage();
export {
    storage,firebase as default 
}