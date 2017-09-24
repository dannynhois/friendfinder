$("#submitButton").on("click", e => {
  // e.preventDefault();
  //enter form information into newUser object
  var newUser = {
    name: $("#user_name").val(),
    photo: $("#user_photo").val(),
    scores: []
  };
  //add ratings to scores
  $("input:checked").each((i, v) => {
    newUser.scores.push(v.value * 1);
  });
  console.log("submit clicked:", newUser);
  if (validateForm(newUser, $(".starRating").length)) {
    postData(newUser);
  } else {
    console.log("invalid form");
  }
});

function validateForm(user, numOfQuestions) {
  //check if name is filled out
  if (!user.name) {
    return alert("Please enter your name");
  }
  //check if photo is filled out
  if (!user.photo) {
    return alert("Please enter a link to your photo");
  }
  //if scores lenght is less then the number of questions
  if (user.scores.length < numOfQuestions) {
    return alert("Please answer all questions");
  }
  return true;
}

function postData(newUser) {
    $.post("/api/friends", newUser, matchedUser => {
        console.log('posted data');
        $("#exampleModalLabel").text("You should get a " + matchedUser.name);
        var image = $("<img>");
        image.attr("src", matchedUser.photo);
        image.css("max-width","95%")
        $("#exampleModalBody").html(image);
        $("#exampleModal").modal("show");
        
    })
}
