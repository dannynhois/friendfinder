const routes = require("express").Router();
const Friends = require("../app/data/friends");
var bodyParser = require("body-parser");
// var jsonParser = bodyParser.json();

routes.use(bodyParser.urlencoded({ extended: true }));
// routes.use(bodyParser.json());

routes.get("/api/friends", (req, res) => {
  res.json(Friends);
});

routes.post("/api/friends", (req, res) => {
  //create answer object
  var answer = {
    friend: Friends[0],
    difference: 100
  };

  //store form into newFriend
  var newFriend = {
    name: req.body.name,
    photo: req.body.photo,
    scores: req.body.scores
  };

  //find friend in current database with least difference
  for (var i = 0; i < Friends.length; i++) {
    var difference = getDifferenceInScores(newFriend, Friends[i]);
    // console.log('Friend: ',Friends[i],' difference = ',difference);
    if (difference < answer.difference) {
      answer.friend = Friends[i];
      answer.difference = difference;
    }
  }

  //create new obje
  //   console.log("difference: ", getDifferenceInScores(newFriend, Friends[0]));
  res.json(answer.friend);
});

function getDifferenceInScores(firstFriend, secondFriend) {
  var difference = 0;
  for (var i = 0; i < firstFriend.scores.length; i++) {
    // console.log(firstFriend.scores[i], secondFriend.scores[i]);
    difference += Math.abs(firstFriend.scores[i] - secondFriend.scores[i]);
  }
  return difference;
}

module.exports = routes;
