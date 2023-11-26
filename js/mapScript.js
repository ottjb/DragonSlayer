$(document).ready(function () {
  ///////////////
  // Test User //
  ///////////////

  var testUser = {
    id: 1,
    username: "testUser",
    password: "testPassword",
    gameState: {
      map: [0, 0, 0, 0, 0, 0],
      positionOnMap: 0,
    },
    accountStats: {
      attempts: 0,
      victories: 0,
      enemiesSlain: 0,
    },
    character: {
      name: "Rick",
      class: "Fighter",
      maxHP: 100,
      currentHP: 100,
      attack: 12,
      defense: 10,
      speed: 8,
      dodge: 5,
    },
    pets: ["cat", "dog"],
  };

  var currentUser = testUser;

  /////////////////
  // Pet Section //
  /////////////////

  var petsMap = [];

  for (var i = 0; i < currentUser.pets.length; i++) {
    petsMap.push({
      id: i + 1,
      name: currentUser.pets[i],
    });
    console.log(currentUser.pets[i]);
  }

  petsMap.forEach((pet) => {
    $("#pet").append(`<option value="${pet.id}">${pet.name}</option>`);
  });

  $("#arrowLeft").click(function () {
    var current = parseInt($("#pet").val());
    var next = current - 1;
    if (next < 1) {
      next = currentUser.pets.length;
    }
    $("#pet").val(next);
  });

  $("#arrowRight").click(function () {
    var current = parseInt($("#pet").val());
    var next = current + 1;
    if (next > currentUser.pets.length) {
      console.log("here");
      next = 1;
    }
    $("#pet").val(next);
  });

  ///////////////////////////
  // Loading Account Stats //
  ///////////////////////////

  $("#accStatsCont__username").text(currentUser.username);
  $("#accStatsCont__numOfAttempts").text(currentUser.accountStats.attempts);
  $("#accStatsCont__victories").text(currentUser.accountStats.victories);
  $("#accStatsCont__enemiesSlain").text(currentUser.accountStats.enemiesSlain);
  $("#accStatsCont__petsAcquired").text(currentUser.pets.length);
  $("#accStatsCont__currentClass").text(currentUser.character.class);
});
