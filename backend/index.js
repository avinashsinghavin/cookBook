"use strict";
const express = require("express");
const server = require("./server");
const retriveData = require("./retrive-data");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require('cors');


const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });


const hostname = "127.0.0.1";
const port = 4000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.get("/", server.sendDataGet);
app.post("/cuisine/:id", retriveData.getCuisine);
app.get("/:name", retriveData.fetchGetData);
app.post("/register", server.register);
app.post("/loginUser", server.loginUser);
app.post("/logout", server.logout);
app.post("/addcuisine", upload.single("photo"), server.addCuisine);
app.post("/getcomments", retriveData.comments);
app.post("/postComments", retriveData.postComments);
app.post("/postNote", retriveData.postNote);
app.post("/postfavorites", retriveData.postfavorites);
app.post("/getNote", retriveData.getNote);
app.post("/getfavorites", retriveData.getfavorites);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
