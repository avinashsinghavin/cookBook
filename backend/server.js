const firebase = require("firebase/app");
const admin = require("firebase-admin");

const serviceAccount = require("./cookbook-65ea7-firebase-adminsdk-j6z6l-d09b4384c5.json");

require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

var firebaseConfig = {
  apiKey: "AIzaSyB9or6V8caKwK3bwiw4p1D91Lv88p8PvYg",
  authDomain: "cookbook-65ea7.firebaseapp.com",
  databaseURL: "https://cookbook-65ea7-default-rtdb.firebaseio.com",
  projectId: "cookbook-65ea7",
  storageBucket: "cookbook-65ea7.appspot.com",
  messagingSenderId: "299647681288",
  appId: "1:299647681288:web:2ef1c58dbe2f85a25e22bd",
  measurementId: "G-38VZGR8HB2",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const sendDataGet = (req, res) => {
  var all_cuisine = [];
  db.listCollections()
    .then((snapshot) => {
      snapshot.forEach((snaps) => {
        if (snaps["_queryOptions"].collectionId.split("-")[1] === "cuisine") {
          var cuisine = snaps["_queryOptions"].collectionId;
          all_cuisine.push({ id: cuisine });
        }
      });
      res.status(200).json(all_cuisine);
    })
    .catch((error) => console.log(error));
};

const register = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = "UserId" + Date.now();
  const name = req.body.name;
  const data = { id: id, name: name };
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const adddata = db.collection("registeredUser").doc(email).set(data);
      res.status(201).json({
        message: "Successful",
        token: { name: name, id: id },
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      res.status(403).json({
        message: "Error",
        errmessage: errorCode,
        messageto: errorMessage,
      });
    });
};

const loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const snapshot = db
        .collection("registeredUser")
        .doc("avin1152@gmail.com");
      snapshot.get().then((docRef) => {
        res.status(200).json({ message: "Successful", token: docRef.data() });
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      res
        .status(200)
        .json({
          message: "Error",
          errorCode: errorCode,
          errorMessage: errorMessage,
        });
    });
};

const logout = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      res.status(200).json({ message: "Logout Successful" });
    })
    .catch((error) => {
      res.status(401).json({ message: "Error while logout" });
    });
};

const addCuisine = (req, res) => {
  const image = req.file.filename;
  const name = req.body.name;
  const time = req.body.time;
  const recipe = req.body.recipe;
  const cuisine = req.body.cuisine;
  const id = req.body.id;
  const ingredients = req.body.ingredients;
  const cuisineid = "cuisineid" + Date.now();
  const data = {
    id: id,
    image: image,
    name: name,
    time: time,
    ingredients: ingredients,
    recipe: recipe,
    cuisine: cuisine,
  };
  const adddata = db
    .collection(cuisine + "-cuisine")
    .doc(cuisineid)
    .set(data);
  res.status(201).json({
    image: image,
    name: name,
    time: time,
    recipe: recipe,
    cuisine: cuisine,
    id: id,
  });
};

module.exports = {
  //export Function
  sendDataGet,
  register,
  loginUser,
  addCuisine,
  logout,
  //Export Data
  db,
  firebase,
  admin,
  serviceAccount,
  database,
};
