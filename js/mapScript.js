const currentUser = "testUser";
var userData;
$(document).ready(function () {
  const db = firebase.firestore();
  var userRef = db.collection("DragonSlayerUsers").doc(currentUser);
  userRef.get().then((querySnapshot) => {
    userData = querySnapshot.data().userData;
    console.log(userData);
    startGame();
  });
});

function startGame() {
  ///////////////
  // Test User //
  ///////////////

  /*
  var testUser = {
    id: 1,
    username: "testUser",
    password: "testPassword",
    gameState: {
      map: [1, 3, 0, 0, 5],
      positionOnMap: 0,
      currentEnemy: 0,
    },
    accountStats: {
      attempts: 0,
      victories: 0,
      enemiesSlain: 0,
    },
    character: {
      name: "Rick",
      class: "Ranger",
      sprite: "img/fighter/front/gold.png",
      maxHP: 100,
      currentHP: 100,
      attack: 12,
      defense: 10,
      speed: 8,
      dodge: 5,
    },
    acquiredPets: ["Cat", "Dog", "Bird", "Turtle"],
    currentEquippedPet: "Dog",
  };
  */

  console.log(userData);

  /////////////////
  // Pet Section //
  /////////////////

  var petsList = [
    {
      name: "Dog",
      boostedStat: "attack",
    },
    {
      name: "Turtle",
      boostedStat: "defense",
    },
    {
      name: "Cat",
      boostedStat: "speed",
    },
    {
      name: "Bird",
      boostedStat: "dodge",
    },
  ];

  var petsMap = [];

  for (var i = 0; i < userData.pets.acquiredPets.length; i++) {
    petsMap.push({
      id: i + 1,
      name: userData.pets.acquiredPets[i],
    });
  }

  petsMap.forEach((pet) => {
    console.log(pet);
    $("#pet").append(`<option value="${pet.id}">${pet.name}</option>`);
  });

  $("#pet").val(
    userData.pets.acquiredPets.indexOf(userData.pets.equippedPet) + 1
  );

  userData.character[
    petsList.find((pet) => pet.name === userData.pets.equippedPet).boostedStat
  ] += 10;

  $("#arrowLeft").click(function () {
    var current = parseInt($("#pet").val());
    var next = current - 1;
    if (next < 1) {
      next = userData.pets.acquiredPets.length;
    }
    $("#pet").val(next);
    changePet();
  });

  $("#arrowRight").click(function () {
    var current = parseInt($("#pet").val());
    var next = current + 1;
    if (next > userData.pets.acquiredPets.length) {
      next = 1;
    }
    $("#pet").val(next);
    changePet();
  });

  function changePet() {
    var currentPet = userData.pets.equippedPet;
    var currentBoostedStat = petsList.find(
      (pet) => pet.name === currentPet
    ).boostedStat;
    userData.character[currentBoostedStat] -= 10;
    var newPet = petsMap.find(
      (pet) => pet.id === parseInt($("#pet").val())
    ).name;
    var newBoostedStat = petsList.find(
      (pet) => pet.name === newPet
    ).boostedStat;
    userData.character[newBoostedStat] += 10;
    userData.pets.equippedPet = newPet;
    updateCharacterStats();
  }

  ///////////////////////////
  // Loading Account Stats //
  ///////////////////////////

  $("#accStatsCont__username").text(currentUser);
  $("#accStatsCont__numOfAttempts").text(userData.accountStats.attempts);
  $("#accStatsCont__victories").text(userData.accountStats.victories);
  $("#accStatsCont__enemiesSlain").text(userData.accountStats.enemiesSlain);
  $("#accStatsCont__petsAcquired").text(userData.pets.acquiredPets.length);
  $("#accStatsCont__currentClass").text(userData.character.class);

  //////////////////////////////
  //  Loading Character Moves //
  //////////////////////////////

  // Moves By Class
  var fighterMoves = [
    "Crushing Blow",
    "Guardian's Resolve",
    "Vital Surge",
    "Intimidating Aura",
  ];
  var fighterDescriptions = [
    "Strike your enemy, doing large damage.",
    "Increase your defense and attack for the next 2 turns.",
    "Heal for 30% of your max HP.",
    "Lower your enemy's attack for 3 turns.",
  ];

  var rogueMoves = [
    "Lethal Backstab",
    "Acrobatic Evasion",
    "Quick Patch-Up",
    "Shadow Step",
  ];
  var rogueDescriptions = [
    "Do a large amount of damage to your enemy with a chance to inflict bleed.",
    "Increase your speed and dodge chance for 3 turns.",
    "Heal a small amount of health and gain increased dodge chance for 3 turns.",
    "Increase your attack and speed for the next 2 turns.",
  ];

  var wizardMoves = [
    "Arcane Missiles",
    "Astral Ward",
    "Celestial Infusion",
    "Inflict Burn",
  ];
  var wizardDescriptions = [
    "Fire an amount of missile based on your attack stack that each do a fixed amount of damage.",
    "Increase your defense for 3 turns.",
    "Heal for 10% of your max HP this turn and for the next 3 turns.",
    "Inflict burn on your enemy for 3 turns.",
  ];

  var rangerMoves = [
    "Piercing Shot",
    "Natural Camoflage",
    "Nature's Blessing",
    "Mark of the Predator",
  ];
  var rangerDescriptions = [
    "Fire an arrow that ignores some of the enemies armor.",
    "Increase your dodge chance to 100% for this turn and the next.",
    "Heal and gain increased attack for the next 2 turns",
    "Decrease the enemies defense for the next 2 turns.",
  ];

  switch (userData.character.class) {
    case "Fighter":
      for (var i = 0; i < 4; i++) {
        $(`#moveset-container__move${i}`).text(fighterMoves[i]);
        $(`#moveset-container__move${i}desc`).text(fighterDescriptions[i]);
      }
      break;
    case "Rogue":
      for (var i = 0; i < 4; i++) {
        $(`#moveset-container__move${i}`).text(rogueMoves[i]);
        $(`#moveset-container__move${i}desc`).text(rogueDescriptions[i]);
      }
      break;
    case "Wizard":
      for (var i = 0; i < 4; i++) {
        $(`#moveset-container__move${i}`).text(wizardMoves[i]);
        $(`#moveset-container__move${i}desc`).text(wizardDescriptions[i]);
      }
      break;
    case "Ranger":
      for (var i = 0; i < 4; i++) {
        $(`#moveset-container__move${i}`).text(rangerMoves[i]);
        $(`#moveset-container__move${i}desc`).text(rangerDescriptions[i]);
      }
      break;
    default:
      break;
  }
  /////////////////////////////
  // Loading Character Stats //
  /////////////////////////////

  function updateCharacterStats() {
    $("#charStatsCont__atk").text(userData.character.attack);
    $("#charStatsCont__def").text(userData.character.defense);
    $("#charStatsCont__spd").text(userData.character.speed);
    $("#charStatsCont__dg").text(userData.character.dodge);
  }

  ///////////////
  // Map Stuff //
  ///////////////

  $(".space").click(function (event) {
    var map = userData.gameState.map;
    console.log(this.id, userData.gameState.positionOnMap);
    // check if character is adjacent to space clicked
    var position = parseInt(userData.gameState.positionOnMap);
    if (this.id == position - 1 || this.id == position + 1) {
      console.log("adjacent");
      // check if space clicked is enemy or empty

      if (map[this.id] === 0) {
        console.log("empty");
        userData.gameState.positionOnMap = this.id;
        moveCharacter(position, userData.gameState.positionOnMap);
        event.preventDefault();
        return;
      } else if (map[this.id] <= 5 && map[this.id] >= 2) {
        userData.gameState.currentEnemy = map[this.id];
        updateDBThenBattle();
        /* this code needs to run if battle is won
        userData.gameState.positionOnMap = this.id;
        moveCharacter(position, userData.gameState.positionOnMap);
        */
      }
    } else {
      return;
    }
  });

  function moveCharacter(currentPosition, spaceClicked) {
    console.log(currentPosition);
    userData.gameState.map[currentPosition] = 0;
    userData.gameState.map[spaceClicked] = 1;
    loadMap(userData.gameState.map);
  }

  ///////////////////////////
  // Generate and Load Map //
  ///////////////////////////

  // gen map based with scaling chance for harder stuff
  function generateMap() {
    var map = [];
    map.push(1);
    for (i = 1; i < 4; i++) {}
  }

  function loadMap(map) {
    map.forEach((space, index) => {
      switch (space) {
        case 0:
          $(`#space-img-${index}`).attr("src", "img/blank.png");
          break;
        case 1:
          $(`#space-img-${index}`).attr("src", userData.character.sprite.front);
          break;
        case 2:
          $(`#space-img-${index}`).attr("src", "img/enemy/bandit.png");
          break;
        case 3:
          $(`#space-img-${index}`).attr("src", "img/enemy/goblin.png");
          break;
        case 4:
          $(`#space-img-${index}`).attr("src", "img/enemy/skeleton.png");
          break;
        case 5:
          $(`#space-img-${index}`).attr("src", "img/enemy/dragon.png");
          break;
        default:
          break;
      }
    });
  }

  if (userData.gameState.map.length == 0) {
    generateMap();
    loadMap(userData.gameState.map);
  } else {
    loadMap(userData.gameState.map);
  }

  ////////////////////////////////
  // Functions Ran on Page Load //
  ////////////////////////////////

  updateCharacterStats();
  //modAnchors();

  /////////////
  // Utility //
  /////////////
  // Generate a random number
  function genRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updateDBThenBattle() {
    const db = firebase.firestore();
    var userRef = db.collection("DragonSlayerUsers").doc(currentUser);
    userRef
      .set({
        userData: userData,
      })
      .then(function () {
        console.log(userData);
        window.location.href = "battle.html";
      });
  }

  function generateMap() {
    var map = [];
    map.push(1);
    for (i = 1; i < 4; i++) {
      map.push(genRandomNumber(2, 4));
    }
    map.push(5);
    userData.gameState.map = map;
    userData.gameState.positionOnMap = 0;
    userData.gameState.currentEnemy = 0;
  }

  console.log("mapScript.js loaded");
} // End of startGame()
