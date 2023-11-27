$(document).ready(function () {
  ///////////////
  // Test User //
  ///////////////

  var testUser = {
    id: 1,
    username: "testUser",
    password: "testPassword",
    gameState: {
      map: [1, 0, 0, 0, 5],
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
    pets: ["Cat", "Dog", "Bird", "Turtle"],
    currentEquippedPet: "Dog",
  };

  var currentUser = testUser;

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

  for (var i = 0; i < currentUser.pets.length; i++) {
    petsMap.push({
      id: i + 1,
      name: currentUser.pets[i],
    });
  }

  petsMap.forEach((pet) => {
    $("#pet").append(`<option value="${pet.id}">${pet.name}</option>`);
  });

  $("#pet").val(currentUser.pets.indexOf(currentUser.currentEquippedPet) + 1);
  currentUser.character[
    petsList.find(
      (pet) => pet.name === currentUser.currentEquippedPet
    ).boostedStat
  ] += 10;

  $("#arrowLeft").click(function () {
    var current = parseInt($("#pet").val());
    var next = current - 1;
    if (next < 1) {
      next = currentUser.pets.length;
    }
    $("#pet").val(next);
    changePet();
  });

  $("#arrowRight").click(function () {
    var current = parseInt($("#pet").val());
    var next = current + 1;
    if (next > currentUser.pets.length) {
      next = 1;
    }
    $("#pet").val(next);
    changePet();
  });

  function changePet() {
    var currentPet = currentUser.currentEquippedPet;
    var currentBoostedStat = petsList.find(
      (pet) => pet.name === currentPet
    ).boostedStat;
    currentUser.character[currentBoostedStat] -= 10;
    var newPet = petsMap.find(
      (pet) => pet.id === parseInt($("#pet").val())
    ).name;
    var newBoostedStat = petsList.find(
      (pet) => pet.name === newPet
    ).boostedStat;
    currentUser.character[newBoostedStat] += 10;
    currentUser.currentEquippedPet = newPet;
    updateCharacterStats();
  }

  ///////////////////////////
  // Loading Account Stats //
  ///////////////////////////

  $("#accStatsCont__username").text(currentUser.username);
  $("#accStatsCont__numOfAttempts").text(currentUser.accountStats.attempts);
  $("#accStatsCont__victories").text(currentUser.accountStats.victories);
  $("#accStatsCont__enemiesSlain").text(currentUser.accountStats.enemiesSlain);
  $("#accStatsCont__petsAcquired").text(currentUser.pets.length);
  $("#accStatsCont__currentClass").text(currentUser.character.class);

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

  switch (currentUser.character.class) {
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
    $("#charStatsCont__atk").text(currentUser.character.attack);
    $("#charStatsCont__def").text(currentUser.character.defense);
    $("#charStatsCont__spd").text(currentUser.character.speed);
    $("#charStatsCont__dg").text(currentUser.character.dodge);
  }

  ///////////////
  // Map Stuff //
  ///////////////

  $(".space").click(function (event) {
    var map = currentUser.gameState.map;
    console.log(map[this.id]);
    // check if character is adjacent to space clicked
    var position = parseInt(currentUser.gameState.positionOnMap);
    if (this.id == position - 1 || this.id == position + 1) {
      // check if space clicked is enemy or empty

      if (map[this.id] === 0) {
        currentUser.gameState.positionOnMap = this.id;
        modAnchors();
        moveCharacter(position, currentUser.gameState.positionOnMap);
        event.preventDefault();
        return;
      } else if (map[this.id] <= 5 && map[this.id] >= 2) {
        currentUser.gameState.currentEnemy = map[this.id];
        currentUser.gameState.positionOnMap = this.id;
        modAnchors();
      }
      moveCharacter(position, currentUser.gameState.positionOnMap);
      console.log(
        currentUser.gameState.map,
        currentUser.gameState.positionOnMap,
        currentUser.gameState.currentEnemy
      );
    }
  });

  function modAnchors() {
    for (var i = 0; i < 5; i++) {
      if (
        currentUser.gameState.map[i] <= 5 &&
        currentUser.gameState.map[i] >= 2
      ) {
        $(`#space-${i}`).attr("href", "battle.html");
      } else {
        $(`#space-${i}`).attr("href", "#");
      }
    }
  }

  function moveCharacter(currentPosition, spaceClicked) {
    currentUser.gameState.map[currentPosition] = 0;
    currentUser.gameState.map[spaceClicked] = 1;
    loadMap(currentUser.gameState.map);
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
          $(`#space-img-${index}`).attr("src", currentUser.character.sprite);
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

  if (currentUser.gameState.map === "") {
    generateMap();
  } else {
    loadMap(currentUser.gameState.map);
  }

  ////////////////////////////////
  // Functions Ran on Page Load //
  ////////////////////////////////

  updateCharacterStats();
  modAnchors();

  /////////////
  // Utility //
  /////////////
  // Generate a random number
  function genRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log("mapScript.js loaded");
}); // End of document.ready
