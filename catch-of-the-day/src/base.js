import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBjSXVmVy6j8z82PVl30TZQkcrlI7HHvpE",
    authDomain: "catch-of-the-day-sagar.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-sagar.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;