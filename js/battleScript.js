/*
Contents:
Classes
Enemies
Status Effects
Character Constructor
Test Characters
Populate Screen
Buttons
Battle
Functions Ran on Build
Utility
*/

// stopped while fixing guardians resolve, was stacking the stat bonuses

const currentUser = "testUser";
var userData;
$(document).ready(function () {
  const db = firebase.firestore();
  var userRef = db.collection("DragonSlayerUsers").doc(currentUser);
  userRef.get().then((querySnapshot) => {
    userData = querySnapshot.data().userData;
    startGame();
  });
});

function startGame() {
  $("#goToMap").hide();
  $("#goToMap").click(function () {
    updateStatsFromPet();
    userData.gameState.map[userData.gameState.positionOnMap] = 0;
    userData.gameState.positionOnMap++;
    userData.gameState.map[userData.gameState.positionOnMap] = 1;
    updateDBThenMap();
  });
  $("#newChar").hide();
  $("#newChar").click(function () {
    userData.character = {};
    userData.gameState.currentEnemy = 0;
    userData.gameState.map = "";
    userData.gameState.positionOnMap = 0;
    updateDBThenChar();
  });

  /////////////
  // Classes //
  /////////////

  // Fighter

  var fighter = {
    name: "Fighter",
    /*
    baseMaxHP: 100,
    currentHP: 100,
    baseAttack: 12,
    baseDefense: 10,
    baseSpeed: 8,
    baseDodge: 5,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
    */
    moveset: [
      {
        name: "Crushing Blow",
        effect: function (stats) {
          if (checkDodged(stats.enemyDodge)) {
            addToBattleLog(
              `${enemy.name} dodged ${player.name}'s Crushing Blow!`
            );
            return;
          }
          var damage = Math.round(stats.playerAtk * 3 - stats.enemyDef / 2);
          addToBattleLog(`${player.name} uses Crushing Blow!`);
          doDamage(enemy, damage);
        },
      },
      {
        name: "Guardian's Resolve",
        effect: function () {
          addToBattleLog(`${player.name} uses Guardian's Resolve!`);
          player.bonusAttack += Math.round(player.attack * 0.2);
          console.log(player.bonusAttack);
          player.bonusDefense += Math.round(player.defense * 0.5);
          addToBattleLog(`${player.name}'s Attack and Defense increased!`);
          updateStatBlock(
            player.attack + player.bonusAttack,
            player.defense + player.bonusDefense,
            player.speed + player.bonusSpeed,
            player.dodge + player.bonusDodge
          );
          currentStatuses.push(["guardian's resolve", 2, player]);
        },
      },
      {
        name: "Vital Surge",
        effect: function (stats) {
          addToBattleLog(`${player.name} uses Vital Surge!`);
          var heal = Math.round(player.maxHP * 0.3);
          doHeal(player, heal);
        },
      },
      {
        name: "Intimidating Aura",
        effect: function () {
          addToBattleLog(`${player.name} uses Intimidating Aura!`);
          enemy.bonusAttack -= Math.round(enemy.baseAttack * 0.15);
          addToBattleLog(`${enemy.name}'s Attack decreased!`);
          currentStatuses.push(["intimidating aura", 2, enemy]);
        },
      },
    ],
  };

  // Rogue

  var rogue = {
    name: "Rogue",
    /*
    baseMaxHP: 80,
    currentHP: 80,
    baseAttack: 9,
    baseDefense: 8,
    baseSpeed: 12,
    baseDodge: 15,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
    */
    moveset: [
      {
        name: "Lethal Backstab",
        effect: function (stats) {
          if (checkDodged(stats.enemyDodge)) {
            addToBattleLog(
              `${enemy.name} dodged ${player.name}'s Lethal Backstab!`
            );
            return;
          }
          var damage = Math.round(
            stats.playerAtk * 2 + stats.playerSpd * 1.5 - stats.enemyDef / 2
          );
          addToBattleLog(`${player.name} uses Lethal Backstab!`);
          doDamage(enemy, damage);
          if (genRandomNumber(1, 100) <= 20) {
            if (!checkStatus(enemy, "bleed")) {
              currentStatuses.push(["bleed", 3, enemy]);
              addToBattleLog(`${enemy.name} is now bleeding!`);
            }
          }
        },
      },
      {
        name: "Acrobatic Evasion",
        effect: function () {
          addToBattleLog(`${player.name} uses Acrobatic Evasion!`);
          player.bonusDodge += Math.round(player.dodge * 3);
          player.bonusSpeed += Math.round(player.speed * 0.1);
          addToBattleLog(`${player.name}'s Dodge and Speed increased!`);
          updateStatBlock(
            player.attack + player.bonusAttack,
            player.defense + player.bonusDefense,
            player.speed + player.bonusSpeed,
            player.dodge + player.bonusDodge
          );
          currentStatuses.push(["acrobatic evasion", 2, player]);
        },
      },
      {
        name: "Quick Patch-Up",
        effect: function () {
          addToBattleLog(`${player.name} uses Quick Patch-Up!`);
          var heal = Math.round(player.maxHP * 0.15);
          doHeal(player, heal);
          player.bonusDodge += player.dodge;
          addToBattleLog(`${player.name}'s Dodge increased!`);
          updateStatBlock(
            player.attack + player.bonusAttack,
            player.defense + player.bonusDefense,
            player.speed + player.bonusSpeed,
            player.dodge + player.bonusDodge
          );
          currentStatuses.push(["quick patch-up", 2, player]);
        },
      },
      {
        name: "Shadow Step",
        effect: function () {
          addToBattleLog(`${player.name} uses Shadow Step!`);
          player.bonusAttack += Math.round(player.attack * 0.3);
          player.bonusSpeed += Math.round(player.speed * 0.2);
          addToBattleLog(`${player.name}'s Attack and Speed increased!`);
          updateStatBlock(
            player.attack + player.bonusAttack,
            player.defense + player.bonusDefense,
            player.speed + player.bonusSpeed,
            player.dodge + player.bonusDodge
          );
          currentStatuses.push(["shadow step", 2, player]);
        },
      },
    ],
  };

  // Wizard
  var wizard = {
    name: "Wizard",
    /*
    baseMaxHP: 70,
    currentHP: 70,
    baseAttack: 15,
    baseDefense: 6,
    baseSpeed: 10,
    baseDodge: 10,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
    */
    moveset: [
      {
        name: "Arcane Missiles",
        effect: function (stats) {
          var numberOfMissiles = stats.playerAtk / 3;
          addToBattleLog(
            `${player.name} fires ${numberOfMissiles} Arcane Missiles!`
          );
          var missilesLanded = 0;
          var damage = 0;
          for (var i = 0; i < numberOfMissiles; i++) {
            if (!checkDodged(stats.enemyDodge)) {
              missilesLanded++;
              damage += 8 - stats.enemyDef / 2;
            }
          }
          addToBattleLog(
            `${missilesLanded} of ${player.name}'s Arcane Missiles hit!`
          );
          doDamage(enemy, damage);
        },
      },
      {
        name: "Astral Ward",
        effect: function () {
          addToBattleLog(`${player.name} uses Astral Ward!`);
          player.bonusDefense += Math.round(player.defense * 0.5);
          addToBattleLog(`${player.name}'s Defense increased!`);
          updateStatBlock(
            player.attack + player.bonusAttack,
            player.defense + player.bonusDefense,
            player.speed + player.bonusSpeed,
            player.dodge + player.bonusDodge
          );
          currentStatuses.push(["astral ward", 2, player]);
        },
      },
      {
        name: "Celestial Infusion",
        effect: function () {
          addToBattleLog(`${player.name} uses Celestial Infusion!`);
          var heal = Math.round(player.maxHP * 0.1);
          doHeal(player, heal);
          currentStatuses.push(["celestial infusion", 3, player]);
        },
      },
      {
        name: "Inflict Burn",
        effect: function () {
          addToBattleLog(`${player.name} uses Inflict Burn!`);
          var damage = Math.round(player.baseAttack * 0.2);
          doDamage(enemy, damage);
          currentStatuses.push(["burn", 3, enemy]);
        },
      },
    ],
  };

  // Ranger
  var ranger = {
    name: "Ranger",
    /*
    baseMaxHP: 90,
    currentHP: 90,
    baseAttack: 11,
    baseDefense: 9,
    baseSpeed: 10,
    baseDodge: 12,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
    */
    moveset: [
      {
        name: "Piercing Shot",
        effect: function (stats) {
          if (checkDodged(stats.enemyDodge)) {
            addToBattleLog(`${enemy.name} dodged ${player.name}'s attack!`);
            return;
          }
          stats.enemyDef -= stats.enemyDef * 0.2;
          var damage = Math.round(stats.playerAtk * 2 - stats.enemyDef / 2);
          addToBattleLog(`${player.name} uses Piercing Shot!`);
          doDamage(enemy, damage);
        },
      },
      {
        name: "Natural Camoflage",
        effect: function () {
          addToBattleLog(`${player.name} uses Natural Camoflage!`);
          player.bonusDodge += 100 - player.dodge;
          addToBattleLog(`${player.name}'s Dodge increased!`);
          updateStatBlock(
            player.attack + player.bonusAttack,
            player.defense + player.bonusDefense,
            player.speed + player.bonusSpeed,
            player.dodge + player.bonusDodge
          );
          currentStatuses.push(["natural camoflage", 1, player]);
        },
      },
      {
        name: "Nature's Blessing",
        effect: function () {
          addToBattleLog(`${player.name} uses Nature's Blessing!`);
          var heal = Math.round(player.maxHP * 0.2);
          doHeal(player, heal);
          currentStatuses.push(["nature's blessing", 2, player]);
        },
      },
      {
        name: "Mark of the Predator",
        effect: function () {
          addToBattleLog(`${player.name} uses Mark of the Predator!`);
          enemy.bonusDefense -= Math.round(enemy.baseDefense * 0.1);
          addToBattleLog(`${enemy.name}'s Defense decreased!`);
          currentStatuses.push(["mark of the predator", 2, enemy]);
        },
      },
    ],
  };

  /////////////
  // Enemies //
  /////////////

  var enemyArray = ["bandit", "Goblin", "Skeleton", "Dragon"];

  // Bandit
  var bandit = {
    name: "Bandit",
    sprite: "img/enemy/bandit.png",
    maxHP: 80,
    currentHP: 80,
    baseAttack: 12,
    baseDefense: 8,
    baseSpeed: 10,
    baseDodge: 10,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
    moveset: [
      {
        name: "Sneak Strike",
        effect: function (stats) {
          if (checkDodged(stats.playerDodge)) {
            addToBattleLog(`${player.name} dodged ${enemy.name}'s attack!`);
            return;
          }
          addToBattleLog(`${enemy.name} uses Sneak Strike!`);
          var damage = Math.round(stats.enemyAtk * 2 - stats.playerDef / 2);
          doDamage(player, damage);
        },
      },
      {
        name: "Stolen Potion",
        effect: function () {
          addToBattleLog(`${enemy.name} uses Stolen Potion!`);
          var heal = Math.round(enemy.maxHP * 0.2);
          doHeal(enemy, heal);
        },
      },
    ],
  };

  // Goblin
  var goblin = {
    name: "Goblin",
    sprite: "img/enemy/goblin.png",
    maxHP: 70,
    currentHP: 70,
    baseAttack: 10,
    baseDefense: 7,
    baseSpeed: 11,
    baseDodge: 12,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
    moveset: [
      {
        name: "Vicious Strike",
        effect: function (stats) {
          if (checkDodged(stats.playerDodge)) {
            addToBattleLog(`${player.name} dodged ${enemy.name}'s attack!`);
            return;
          }
          addToBattleLog(`${enemy.name} uses Vicious Strike!`);
          var damage = Math.round(stats.enemyAtk * 2.5 - stats.playerDef / 2);
          doDamage(player, damage);
        },
      },
      {
        name: "Herbal Remedy",
        effect: function () {
          addToBattleLog(`${enemy.name} uses Herbal Remedy!`);
          var heal = Math.round(enemy.maxHP * 0.25);
          doHeal(enemy, heal);
        },
      },
    ],
  };

  // Skeleton
  var skeleton = {
    name: "Skeleton",
    sprite: "img/enemy/skeleton.png",
    maxHP: 90,
    currentHP: 90,
    baseAttack: 14,
    baseDefense: 6,
    baseSpeed: 8,
    baseDodge: 7,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
    moveset: [
      {
        name: "Soul Siphon",
        effect: function (stats) {
          if (checkDodged(stats.playerDodge)) {
            addToBattleLog(`${player.name} dodged ${enemy.name}'s attack!`);
            return;
          }
          addToBattleLog(`${enemy.name} uses Soul Siphon!`);
          var damage = Math.round(stats.enemyAtk * 2 - stats.playerDef / 2);
          doDamage(player, damage);
          doHeal(enemy, Math.round(damage * 0.66));
        },
      },
      {
        name: "Soul Mend",
        effect: function () {
          addToBattleLog(`${enemy.name} uses Soul Mend!`);
          var heal = Math.round(enemy.maxHP * 0.3);
          doHeal(enemy, heal);
        },
      },
    ],
  };

  // Dragon
  var dragon = {
    name: "Dragon",
    sprite: "img/enemy/dragon.png",
    maxHP: 150,
    currentHP: 150,
    baseAttack: 25,
    baseDefense: 20,
    baseSpeed: 4,
    baseDodge: 5,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
    moveset: [
      {
        name: "Infernal Breath",
        effect: function (stats) {
          if (checkDodged(stats.playerDodge)) {
            addToBattleLog(`${player.name} dodged ${enemy.name}'s attack!`);
            return;
          }
          addToBattleLog(`${enemy.name} uses Infernal Breath!`);
          var damage = Math.round(stats.enemyAtk * 3 - stats.playerDef / 2);
          doDamage(player, damage);
          addToBattleLog(`${player.name} is now burning!`);
          currentStatuses.push(["infernal breath", 3, player]);
        },
      },
      {
        name: "Draconian Renewal",
        effect: function () {
          addToBattleLog(`${enemy.name} uses Draconian Renewal!`);
          var heal = Math.round(enemy.maxHP * 0.4);
          doHeal(enemy, heal);
        },
      },
    ],
  };

  ///////////////////////
  // Enemy Constructor //
  ///////////////////////

  var currentEnemy = enemyArray[userData.gameState.currentEnemy - 2];
  //var currentEnemy = enemyArray[0];

  function Enemy(currentEnemy) {
    this.name = currentEnemy.name;
    this.sprite = currentEnemy.sprite;
    this.maxHP = currentEnemy.maxHP;
    this.currentHP = currentEnemy.currentHP;
    this.baseAttack = currentEnemy.baseAttack;
    this.baseDefense = currentEnemy.baseDefense;
    this.baseSpeed = currentEnemy.baseSpeed;
    this.baseDodge = currentEnemy.baseDodge;
    this.bonusAttack = currentEnemy.bonusAttack;
    this.bonusDefense = currentEnemy.bonusDefense;
    this.bonusSpeed = currentEnemy.bonusSpeed;
    this.bonusDodge = currentEnemy.bonusDodge;
    this.moveset = currentEnemy.moveset;
  }

  /////////////////////////////
  // Creating the characters //
  /////////////////////////////

  var player = userData.character;
  player.name = currentUser;
  var playerMoveset;

  // Getting the players moveset
  switch (player.class.toLowerCase()) {
    case "fighter":
      playerMoveset = fighter.moveset;
      break;
    case "rogue":
      playerMoveset = rogue.moveset;
      break;
    case "wizard":
      playerMoveset = wizard.moveset;
      break;
    case "ranger":
      playerMoveset = ranger.moveset;
      break;
    default:
      break;
  }

  var enemy = new Enemy(eval(currentEnemy.toLowerCase()));
  console.log(player);
  console.log(enemy);

  ////////////////////
  // Status effects //
  ////////////////////

  statuses = [
    // Bleed
    {
      name: "bleed",
      effect: function (character) {
        var damage = Math.round(player.baseAttack * 0.5);
        addToBattleLog(`${character.name} is still bleeding!`);
        doDamage(character, damage);
      },
    },

    // Guardian's Resolve
    {
      name: "guardian's resolve",
      effect: function () {
        addToBattleLog(`${player.name}'s Guardian's Resolve is still active!`);
        player.bonusAttack += Math.round(player.attack * 0.2);
        player.bonusDefense += Math.round(player.defense * 0.5);
        updateStatBlock(
          player.attack + player.bonusAttack,
          player.defense + player.bonusDefense,
          player.speed + player.bonusSpeed,
          player.dodge + player.bonusDodge
        );
      },
    },

    // Acrobatic Evasion
    {
      name: "acrobatic evasion",
      effect: function (character) {
        addToBattleLog(
          `${character.name}'s Acrobatic Evasion is still active!`
        );
        player.bonusDodge += Math.round(player.dodge * 3);
        player.bonusSpeed += Math.round(player.speed * 0.1);
        updateStatBlock(
          player.attack + player.bonusAttack,
          player.defense + player.bonusDefense,
          player.speed + player.bonusSpeed,
          player.dodge + player.bonusDodge
        );
      },
    },

    // Astral Ward
    {
      name: "astral ward",
      effect: function (character) {
        addToBattleLog(`${character.name}'s Astral Ward is still active!`);
        player.bonusDefense += Math.round(player.defense * 0.5);
        updateStatBlock(
          player.attack + player.bonusAttack,
          player.defense + player.bonusDefense,
          player.speed + player.bonusSpeed,
          player.dodge + player.bonusDodge
        );
      },
    },

    // Natural Camoflage
    {
      name: "natural camoflage",
      effect: function (character) {
        addToBattleLog(
          `${character.name}'s Natural Camoflage is still active!`
        );
        player.bonusDodge += 100 - player.dodge;
        updateStatBlock(
          player.attack + player.bonusAttack,
          player.defense + player.bonusDefense,
          player.speed + player.bonusSpeed,
          player.dodge + player.bonusDodge
        );
      },
    },

    // Quick Patch-Up
    {
      name: "quick patch-up",
      effect: function (character) {
        addToBattleLog(`${character.name}'s Quick Patch-Up is still active!`);
        player.bonusDodge += Math.round(player.dodge * 0.2);
        updateStatBlock(
          player.attack + player.bonusAttack,
          player.defense + player.bonusDefense,
          player.speed + player.bonusSpeed,
          player.dodge + player.bonusDodge
        );
      },
    },

    // Celestial Infusion
    {
      name: "celestial infusion",
      effect: function (character) {
        addToBattleLog(
          `${character.name}'s Celestial Infusion is still active!`
        );
        var heal = Math.round(player.maxHP * 0.1);
        doHeal(player, heal);
      },
    },

    // Nature's Blessing
    {
      name: "nature's blessing",
      effect: function (character) {
        addToBattleLog(
          `${character.name}'s Nature's Blessing is still active!`
        );
        player.bonusAttack += Math.round(player.attack * 0.3);
        updateStatBlock(
          player.attack + player.bonusAttack,
          player.defense + player.bonusDefense,
          player.speed + player.bonusSpeed,
          player.dodge + player.bonusDodge
        );
      },
    },

    // Intimidating Aura
    {
      name: "intimidating aura",
      effect: function (character) {
        addToBattleLog(`${character.name} is still intimidated!`);
        enemy.bonusAttack -= Math.round(enemy.baseAttack * 0.15);
      },
    },

    // Shadow Step
    {
      name: "shadow step",
      effect: function (character) {
        addToBattleLog(`${character.name}'s Shadow Step is still active!`);
        player.bonusAttack += Math.round(player.attack * 0.3);
        player.bonusSpeed += Math.round(player.speed * 0.2);
        updateStatBlock(
          player.attack + player.bonusAttack,
          player.defense + player.bonusDefense,
          player.speed + player.bonusSpeed,
          player.dodge + player.bonusDodge
        );
      },
    },

    // Burn
    {
      name: "burn",
      effect: function (character) {
        addToBattleLog(`${character.name} is still burning!`);
        var damage = Math.round(player.baseAttack * 0.2);
        doDamage(character, damage);
      },
    },

    // Mark of the Predator
    {
      name: "mark of the predator",
      effect: function (character) {
        addToBattleLog(`${character.name} is still marked!`);
        enemy.bonusDefense -= Math.round(enemy.baseDefense * 0.1);
      },
    },

    // Infernal Breath
    {
      name: "infernal breath",
      effect: function (character) {
        addToBattleLog(`${character.name} is still burning!`);
        var damage = Math.round(enemy.baseAttack * 0.2);
        doDamage(character, damage);
      },
    },
  ];

  /////////////////////
  // Populate screen //
  /////////////////////

  // Position will be either player or enemy
  function loadCharacter(position) {
    if (position === "player") {
      $(`#playerName`).html(player.name);
      $(`#playerHP`).html(player.currentHP);
      $(`#playerMaxHP`).html(player.maxHP);
      updateHPBar(position, player.currentHP, player.maxHP);
      $(`#playerSprite`).attr("src", player.sprite.back);
    } else {
      $(`#enemyName`).html(enemy.name);
      $(`#enemyHP`).html(enemy.currentHP);
      $(`#enemyMaxHP`).html(enemy.maxHP);
      updateHPBar(position, enemy.currentHP, enemy.maxHP);
      $(`#enemySprite`).attr("src", enemy.sprite);
    }
  }

  // Updates the HP bar
  function updateHPBar(position, hp, maxHp) {
    $(`#${position}HPBar`).attr("value", hp);
    $(`#${position}HPBar`).attr("max", maxHp);
  }





  /////////////
  // Buttons //
  /////////////

  switch (player.class.toLowerCase()) {
    case "fighter":
      $("#attack").text(fighter.moveset[0].name);
      $("#attack").click(function () {
        initializeBattle(0);
      });
      $("#defend").text(fighter.moveset[1].name);
      $("#defend").click(function () {
        initializeBattle(1);
      });
      $("#heal").text(fighter.moveset[2].name);
      $("#heal").click(function () {
        initializeBattle(2);
      });
      $("#special").text(fighter.moveset[3].name);
      $("#special").click(function () {
        initializeBattle(3);
      });
      break;
    case "Rogue":
      $("#attack").text(rogue.moveset[0].name);
      $("#attack").click(function () {
        initializeBattle(0);
      });
      $("#defend").text(rogue.moveset[1].name);
      $("#defend").click(function () {
        initializeBattle(1);
      });
      $("#heal").text(rogue.moveset[2].name);
      $("#heal").click(function () {
        initializeBattle(2);
      });
      $("#special").text(rogue.moveset[3].name);
      $("#special").click(function () {
        initializeBattle(3);
      });
      break;
    case "Wizard":
      $("#attack").text(wizard.moveset[0].name);
      $("#attack").click(function () {
        initializeBattle(0);
      });
      $("#defend").text(wizard.moveset[1].name);
      $("#defend").click(function () {
        initializeBattle(1);
      });
      $("#heal").text(wizard.moveset[2].name);
      $("#heal").click(function () {
        initializeBattle(2);
      });
      $("#special").text(wizard.moveset[3].name);
      $("#special").click(function () {
        initializeBattle(3);
      });
      break;
    case "Ranger":
      $("#attack").text(ranger.moveset[0].name);
      $("#attack").click(function () {
        initializeBattle(0);
      });
      $("#defend").text(ranger.moveset[1].name);
      $("#defend").click(function () {
        initializeBattle(1);
      });
      $("#heal").text(ranger.moveset[2].name);
      $("#heal").click(function () {
        initializeBattle(2);
      });
      $("#special").text(ranger.moveset[3].name);
      $("#special").click(function () {
        initializeBattle(3);
      });
      break;
    default:
      break;
  }

  ////////////
  // Battle //
  ////////////

  var battleOver = false;
  var currentStatuses = []; // [["status", turns left, target]]
  function initializeBattle(playerAction) {
    console.log(playerMoveset);
    disableButtons();
    addToBattleLog("New Turn Started");
    var stats = calcStats();

    resolveStatuses();

    stats = calcStats();
    updateStatBlock(
      stats.playerAtk,
      stats.playerDef,
      stats.playerSpd,
      stats.playerDodge
    );
    if (stats.playerSpd >= stats.enemySpd) {
      setTimeout(function () {
        playerMoveset[playerAction].effect(calcStats());
        if (enemy.currentHP <= 0) {
          $("#footbar").text("You win!");
          $("#goToMap").show();
          console.log("Enemy is dead");
          battleOver = true;
          return;
        }
      }, 1000 + 1000 * currentStatuses.length);
      setTimeout(function () {
        console.log(stats);
        enemyTurn();
        if (player.currentHP <= 0) {
          $("#footbar").text("Game over");
          $("#newChar").show();
          console.log("Player is dead");
          battleOver = true;
          return;
        }
      }, 2000 + 1000 * currentStatuses.length);
    } else {
      setTimeout(function () {
        enemyTurn();
        if (player.currentHP <= 0) {
          console.log("Player is dead");
          $("#footbar").text("Game over");
          $("#newChar").show();
          battleOver = true;
          return;
        }
      }, 1000 + 1000 * currentStatuses.length);
      setTimeout(function () {
        playerMoveset[playerAction].effect(calcStats());
        if (enemy.currentHP <= 0) {
          console.log("Enemy is dead");
          $("#footbar").text("You win!");
          $("#goToMap").show();
          battleOver = true;
          return;
        }
      }, 2000 + 1000 * currentStatuses.length);
    }

    setTimeout(function () {
      setBonusStatsZero(player);
      setBonusStatsZero(enemy);
      if (battleOver) {
        return;
      }
      enableButtons();
    }, 6000 + 1000 * currentStatuses.length);
  }

  function resolveStatuses() {
    tempStatuses = [];
    // Loop through each status effect
    while (currentStatuses.length > 0) {
      var currentStatus = currentStatuses.pop();
      var statusName = currentStatus[0];
      var statusObject = statuses.find((status) => status.name === statusName);
      setTimeout(function () {
        statusObject.effect(currentStatus[2]);
      }, 1000);
      currentStatus[1]--;
      if (currentStatus[1] > 0) {
        tempStatuses.push(currentStatus);
      }
    }

    while (tempStatuses.length > 0) {
      currentStatuses.push(tempStatuses.pop());
    }
  }

  function enemyTurn() {
    var enemyPercentMissingHP = (1 - enemy.currentHP / enemy.maxHP) * 100;
    var chanceToHeal = Math.round(enemyPercentMissingHP);
    if (genRandomNumber(1, 100) > chanceToHeal) {
      enemy.moveset[0].effect(calcStats());
    } else {
      enemy.moveset[1].effect();
    }
  }

  ////////////////////////////
  // Functions ran on build //
  ////////////////////////////

  loadCharacter("player");
  loadCharacter("enemy");

  updateStatBlock(player.attack, player.defense, player.speed, player.dodge);

  /////////////
  // Utility //
  /////////////

  // Function to append a message to the battle log
  function addToBattleLog(message) {
    $("#logs").append(`<p>${message}</p>`);
    var logContainer = document.getElementById("battleLog");
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  // Function to update the HP bars after a move
  function updateHP() {
    $("#playerHP").html(player.currentHP);
    $("#playerHPBar").attr("value", player.currentHP);
    $("#enemyHP").html(enemy.currentHP);
    $("#enemyHPBar").attr("value", enemy.currentHP);
  }

  // Updates the stat block
  function updateStatBlock(atk, def, spd, dodge) {
    $("#playerAtkSt").html(atk);
    $("#playerDefSt").html(def);
    $("#playerSpdSt").html(spd);
    $("#playerDodgeSt").html(dodge);
  }

  // Disables action buttons
  function disableButtons() {
    $("#attack").prop("disabled", true);
    $("#defend").prop("disabled", true);
    $("#heal").prop("disabled", true);
    $("#special").prop("disabled", true);
  }

  // Enables action buttons
  function enableButtons() {
    $("#attack").prop("disabled", false);
    $("#defend").prop("disabled", false);
    $("#heal").prop("disabled", false);
    $("#special").prop("disabled", false);
  }

  // Sets bonus stats to 0
  function setBonusStatsZero(character) {
    character.bonusAttack = 0;
    character.bonusDefense = 0;
    character.bonusSpeed = 0;
    character.bonusDodge = 0;
  }

  // Generate a random number
  function genRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Check if status effect is already applied
  function checkStatus(character, status) {
    for (var i = 0; i < currentStatuses.length; i++) {
      if (
        currentStatuses[i][0] === status &&
        currentStatuses[i][2] === character
      ) {
        return true;
      }
    }
    return false;
  }

  function doDamage(character, damage) {
    console.log(damage);
    if (character.currentHP - damage < 0) {
      addToBattleLog(`${character.name} took ${character.currentHP} damage!`);
      character.currentHP = 0;
    } else {
      character.currentHP -= damage;
      addToBattleLog(`${character.name} took ${damage} damage!`);
    }
    updateHP();
  }

  function doHeal(character, heal) {
    if (character.currentHP + heal > character.maxHP) {
      addToBattleLog(
        `${character.name} healed for ${character.maxHP - heal} HP!`
      );
      character.currentHP = character.maxHP;
    } else {
      addToBattleLog(`${character.name} healed for ${heal} HP!`);
      character.currentHP += heal;
    }

    updateHP();
  }

  function checkDodged(dodge) {
    if (genRandomNumber(1, 100) < dodge) {
      return true;
    }
  }

  function calcStats() {
    var stats = {
      playerAtk: player.attack + player.bonusAttack,
      playerDef: player.defense + player.bonusDefense,
      playerSpd: player.speed + player.bonusSpeed,
      playerDodge: player.dodge + player.bonusDodge,
      enemyAtk: enemy.baseAttack + enemy.bonusAttack,
      enemyDef: enemy.baseDefense + enemy.bonusDefense,
      enemySpd: enemy.baseSpeed + enemy.bonusSpeed,
      enemyDodge: enemy.baseDodge + enemy.bonusDodge,
    };
    return stats;
  }

  function battleOver() {
    if (player.currentHP <= 0) {
      addToBattleLog(`${character.name} has been defeated!`);
      return true;
    } else if (enemy.currentHP <= 0) {
      addToBattleLog(`${enemy.name} has been defeated!`);
      return true;
    }
    return false;
  }

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

  function updateStatsFromPet() {
    if (userData.pets.equippedPet === "none") {
      return;
    } else {
      var currentBoostedStat = petsList.find(
        (pet) => pet.name === userData.pets.equippedPet
      ).boostedStat;
      userData.character[currentBoostedStat] -= 10;
    }
  }

  function updateDBThenMap() {
    const db = firebase.firestore();
    var userRef = db.collection("DragonSlayerUsers").doc(currentUser);
    userRef
      .set({
        userData: userData,
      })
      .then(function () {
        console.log(userData);
        window.location.href = "map.html";
      });
  }

  function updateDBThenChar() {
    const db = firebase.firestore();
    var userRef = db.collection("DragonSlayerUsers").doc(currentUser);
    userRef
      .set({
        userData: userData,
      })
      .then(function () {
        console.log(userData);
        //window.location.href = ".html";
      });
  }

  console.log("Battle Script Loaded");
} // End of startGame()
