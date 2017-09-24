const routes = require("express").Router();
const Friends = require("../app/data/friends");
var bodyParser = require("body-parser");
// var jsonParser = bodyParser.json();

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

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
    photo: req.body.picture,
    scores: [
      req.body.questionq1,
      req.body.questionq2,
      req.body.questionq3,
      req.body.questionq4,
      req.body.questionq5,
      req.body.questionq6,
      req.body.questionq7,
      req.body.questionq8,
      req.body.questionq9,
      req.body.questionq10
    ]
  };

  //find friend in current database with least difference
  for (var i = 0; i < Friends.length; i++) {
    var difference = getDifferenceInScores(newFriend, Friends[i]);
    if (difference < answer.difference) {
      answer.friend = Friends[i];
      answer.difference = difference;
    }
  }

  //create new obje
  //   console.log("difference: ", getDifferenceInScores(newFriend, Friends[0]));
  res.send(answer.friend);
});

function getDifferenceInScores(firstFriend, secondFriend) {
  var difference = 0;
  for (var i = 0; i < firstFriend.scores.length; i++) {
    difference += Math.abs(firstFriend.scores[i] - secondFriend.scores[i]);
  }
  return difference;
}

module.exports = routes;
