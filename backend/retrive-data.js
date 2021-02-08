const server = require("./server");

const comments = (req, res) => {
  var starCountRef = server.firebase
    .database()
    .ref("comments")
    .child(req.body.id);
  starCountRef.once("value", function name(data) {
    console.log(data.val());
    res.status(200).json(data.val());
  });
};

const fetchGetData = (req, res) => {
  const snapshot = server.db.collection(req.params.name);
  snapshot.get().then((querySnapshot) => {
    const tempDoc = querySnapshot.docs.map((doc) => {
      const comments = (doc.id);
      return { cuisineid: doc.id, ...doc.data(), comments: comments };
    });
    res.status(200).json(tempDoc);
  });
};

const postComments = (req, res) => {
  const cuisineid = req.body.cuisineid;
  const userid = req.body.userid;
  const message = req.body.message;
  var starCountRef = server.firebase
    .database()
    .ref("comments")
    .child(cuisineid)
    .child(userid);
    try{
    starCountRef.once("value", function name(data) {
      var k = data.val();
      if (k === null) {
        var lastValue = {};
        lastValue[1] = message;
        server.firebase
          .database()
          .ref("comments")
          .child(cuisineid)
          .child(userid)
          .update(lastValue);
      } else {
        var lastKey = Object.keys(k).sort().pop();
        var lastValue = {};
        console.log(lastKey);
        lastValue[parseInt(lastKey) + 1] = message;
        server.firebase
          .database()
          .ref("comments")
          .child(cuisineid)
          .child(userid)
          .update(lastValue);
      }
      res.status(200).json({ message: "Success" });
    });
  } catch(e){
    var lastValue = {};
    lastValue[1] = message;
    var userid1 = {}
    userid1[userid] = lastValue;
    var cuiserid = {};
    cuiserid[cuiserid] = userid;
    console.log(cuiserid);
  }
  
};

const postNote = (req, res) => {
  const cuisineid = req.body.cuisineid;
  const userid = req.body.userid;
  const message = req.body.message;
  var starCountRef = server.firebase
    .database()
    .ref("notes")
    .child(cuisineid)
    .child(userid);
    try{
    starCountRef.once("value", function name(data) {
      var k = data.val();
      if (k === null) {
        var lastValue = {};
        lastValue[1] = message;
        server.firebase
          .database()
          .ref("notes")
          .child(cuisineid)
          .child(userid)
          .update(lastValue);
      } else {
        var lastKey = Object.keys(k).sort().pop();
        var lastValue = {};
        console.log(lastKey);
        lastValue[parseInt(lastKey) + 1] = message;
        server.firebase
          .database()
          .ref("notes")
          .child(cuisineid)
          .child(userid)
          .update(lastValue);
      }
      res.status(200).json({ message: "Success" });
    });
  } catch(e){
    var lastValue = {};
    lastValue[1] = message;
    var userid1 = {}
    userid1[userid] = lastValue;
    var cuiserid = {};
    cuiserid[cuiserid] = userid;
    console.log(cuiserid);
  }
};

const postfavorites = (req, res) => {
  const user = req.body.user;
  const type = req.body.type;
  const value = req.body.value;
  var starCountRef = server.firebase
    .database()
    .ref("favorites")
    .child(user)
    .child(type);
  starCountRef.once("value", function name(data) {
    var k = data.val();
    if (k === null) {
      var lastValue = {};
      lastValue[1] = value;
      server.firebase
        .database()
        .ref("favorites")
        .child(user)
        .child(type)
        .update(lastValue);
    } else {
      if (k.filter((x) => x.name === value))
        res.status(208).json({ message: "already Exist" });
      else {
        var lastKey = Object.keys(k).sort().pop();
        var lastValue = {};
        console.log(lastKey);
        lastValue[parseInt(lastKey) + 1] = value;
        server.firebase
          .database()
          .ref("favorites")
          .child(user)
          .child(type)
          .update(lastValue);
      }
    }
    res.status(200).json({ message: "Success" });
  });
};


const getfavorites = (req, res) => {
  const id = req.body.id;
  var starCountRef = server.firebase
    .database()
    .ref("favorites")
    .child(id);
  starCountRef.once("value", function name(data) {
    console.log(data.val());
    res.status(200).json(data.val());
  });

};

const getNote = (req, res) => {
  const id = req.body.id;
  var starCountRef = server.firebase
    .database()
    .ref("notes")
    .child(id);
  starCountRef.once("value", function name(data) {
    console.log(data.val());
    res.status(200).json(data.val());
  });
};

const getCuisine = ((req, res) => {
  server.db.listCollections()
    .then((snapshot) => {
      snapshot.forEach((snaps) => {
        snaps.get().then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            const comments = (doc.id);
            if(doc.id === req.params.id)
            res.status(200).json( {cuisineid: doc.id, ...doc.data(), comments: comments });
          });
        });
      });
    })
});

module.exports = {
  fetchGetData,
  comments,
  postComments,
  postNote,
  postfavorites,
  getNote,
  getfavorites,
  getCuisine
};
