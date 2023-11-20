/* 
Todo:
Battle Script
CREATE FUNCTION THAT DOES THE DAMAGE FOR FUNCTIONS (WILL MAKE EASIER TO FIGURE OUT IF BATTLE ENDS, AND SHORTENS CODE)
Moves for all characters
Add enemy moves
Add stat block bottom left
 */

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

/////////////
// Classes //
/////////////
$(document).ready(function () {
  characters = [
    // Fighter
    {
      name: "fighter",
      sprites: {},
      baseMaxHP: 150,
      currentHP: 150,
      baseAttack: 20,
      baseDefense: 10,
      baseSpeed: 50,
      baseDodge: 0,
      bonusAttack: 0,
      bonusDefense: 0,
      bonusSpeed: 0,
      bonusDodge: 0,
      moveset: [
        {
          name: attack,
          effect: function () {},
        },
        { name: defend, effect: function () {} },
        { name: heal, effect: function () {} },
        { name: special, effect: function () {} },
      ],
    },

    // Rogue
    {
      name: "rogue",
      sprites: {
        front: {
          base: "img/rogue/noVariant/front/base.png",
          blue: "img/rogue/noVariant/front/blue.png",
          purple: "img/rogue/noVariant/front/purple.png",
          red: "img/rogue/noVariant/front/red.png",
        },
        back: {
          base: "img/rogue/noVariant/back/base.png",
          blue: "img/rogue/noVariant/back/blue.png",
          purple: "img/rogue/noVariant/back/purple.png",
          red: "img/rogue/noVariant/back/red.png",
        },
        frontVariant: {
          base: "img/rogue/variant/front/base.png",
          blue: "img/rogue/variant/front/blue.png",
          purple: "img/rogue/variant/front/purple.png",
          red: "img/rogue/variant/front/red.png",
        },
        backVariant: {
          base: "img/rogue/variant/back/base.png",
          blue: "img/rogue/variant/back/blue.png",
          purple: "img/rogue/variant/back/purple.png",
          red: "img/rogue/variant/back/red.png",
        },
      },
      baseMaxHP: 150,
      currentHP: 150,
      baseAttack: 20,
      baseDefense: 10,
      baseSpeed: 50,
      baseDodge: 0,
      bonusAttack: 0,
      bonusDefense: 0,
      bonusSpeed: 0,
      bonusDodge: 0,
      moveset: [
        {
          name: "Lethal Backstab",
          effect: function () {
            if (
              genRandomNumber(1, 100) >
              enemy.charClass.baseDodge + enemy.charClass.bonusDodge
            ) {
              var damage =
                10 +
                Math.round(
                  (player.charClass.baseAttack + player.charClass.bonusAttack) *
                    1.25
                );
              if (enemy.charClass.currentHP - damage < 0) {
                enemy.charClass.currentHP = 0;
              } else {
                enemy.charClass.currentHP -= damage;
              }
              addToBattleLog(
                `${enemy.name} took ${damage} damage from ${player.name}'s Lethal Backstab!`
              );
              if (genRandomNumber(1, 100) > 10) {
                console.log("bleed", currentStatuses);
                if (!checkStatus(enemy, "bleed")) {
                  currentStatuses.push(["bleed", 3, enemy]);
                  addToBattleLog(`${enemy.name} is now bleeding!`);
                }
              }
            } else {
              addToBattleLog(
                `${enemy.name} dodged ${player.name}'s Lethal Backstab!`
              );
            }
            updateHP();
          },
        },
        {
          name: "Acrobatic Evasion",
          effect: function () {
            console.log("defend");
          },
        },
        {
          name: "Quick Patch-Up",
          effect: function () {
            console.log("heal");
          },
        },
        {
          name: "Shadow Step",
          effect: function () {
            console.log("special");
          },
        },
      ],
    },

    // Wizard
    {
      name: "wizard",
      sprites: {
        front: {
          base: "img/wizard/noVariant/front/base.png",
        },
        back: {
          base: "img/wizard/noVariant/back/base.png",
        },
        frontVariant: {
          base: "img/wizard/variant/front/base.png",
        },
        backVariant: {
          base: "img/wizard/variant/back/base.png",
        },
      },
      baseMaxHP: 150,
      currentHP: 150,
      baseAttack: 20,
      baseDefense: 10,
      baseSpeed: 50,
      baseDodge: 0,
      bonusAttack: 0,
      bonusDefense: 0,
      bonusSpeed: 0,
      bonusDodge: 0,
      moveset: [
        {
          name: attack,
          effect: function () {},
        },
        { name: defend, effect: function () {} },
        { name: heal, effect: function () {} },
        { name: special, effect: function () {} },
      ],
    },

    // Ranger
    {
      name: "ranger",
      sprites: {
        front: {
          base: "img/ranger/front/base.png",
          blue: "img/ranger/front/blue.png",
          purple: "img/ranger/front/purple.png",
          white: "img/ranger/front/white.png",
        },
        back: {
          base: "img/ranger/back/base.png",
          blue: "img/ranger/back/blue.png",
          purple: "img/ranger/back/purple.png",
          white: "img/ranger/back/white.png",
        },
      },
      baseMaxHP: 150,
      currentHP: 150,
      baseAttack: 20,
      baseDefense: 10,
      baseSpeed: 50,
      baseDodge: 0,
      bonusAttack: 0,
      bonusDefense: 0,
      bonusSpeed: 0,
      bonusDodge: 0,
      moveset: [
        {
          name: attack,
          effect: function () {},
        },
        { name: defend, effect: function () {} },
        { name: heal, effect: function () {} },
        { name: special, effect: function () {} },
      ],
    },
  ];

  /////////////
  // Enemies //
  /////////////

  enemies = [
    // Bandit
    {
      name: "bandit",
      sprites: "img/ranger/front/white.png",
      baseMaxHP: 150,
      currentHP: 150,
      baseAttack: 20,
      baseDefense: 10,
      baseSpeed: 50,
      baseDodge: 25,
      bonusAttack: 0,
      bonusDefense: 0,
      bonusSpeed: 0,
      bonusDodge: 0,
      moveset: [
        {
          name: attack,
          effect: function () {},
        },
        { name: defend, effect: function () {} },
      ],
    },

    // Goblin
    {
      name: "goblin",
      sprites: {},
      baseMaxHP: 150,
      currentHP: 150,
      baseAttack: 20,
      baseDefense: 10,
      baseSpeed: 50,
      baseDodge: 0,
      bonusAttack: 0,
      bonusDefense: 0,
      bonusSpeed: 0,
      bonusDodge: 0,
      moveset: [
        {
          name: attack,
          effect: function () {},
        },
        { name: defend, effect: function () {} },
      ],
    },

    // Undead
    {
      name: "undead",
      sprites: {},
      baseMaxHP: 150,
      currentHP: 150,
      baseAttack: 20,
      baseDefense: 10,
      baseSpeed: 50,
      baseDodge: 0,
      bonusAttack: 0,
      bonusDefense: 0,
      bonusSpeed: 0,
      bonusDodge: 0,
      moveset: [
        {
          name: attack,
          effect: function () {},
        },
        { name: defend, effect: function () {} },
      ],
    },

    // Dragon
    {
      name: "dragon",
      sprites: {},
      baseMaxHP: 150,
      currentHP: 150,
      baseAttack: 20,
      baseDefense: 10,
      baseSpeed: 50,
      baseDodge: 0,
      bonusAttack: 0,
      bonusDefense: 0,
      bonusSpeed: 0,
      bonusDodge: 0,
      moveset: [
        {
          name: attack,
          effect: function () {},
        },
        { name: defend, effect: function () {} },
      ],
    },
  ];

  ////////////////////
  // Status effects //
  ////////////////////

  var statuses = [
    {
      name: "bleed",
      effect: function (character) {
        var damage = Math.round(
          character.charClass.baseMaxHP * 0.05 +
            (character.charClass.baseMaxHP - character.charClass.currentHP) *
              0.05
        );
        if (character.charClass.currentHP - damage < 0) {
          character.charClass.currentHP = 0;
        } else {
          character.charClass.currentHP -= damage;
        }
        addToBattleLog(`${character.name} took ${damage} damage from Bleed!`);
        updateHP();
      },
    },
    {
      name: "burn",
      effect: function (character) {
        var damage = Math.round(character.charClass.baseMaxHP * 0.1);
        if (character.charClass.currentHP - damage < 0) {
          character.charClass.currentHP = 0;
        } else {
          character.charClass.currentHP -= damage;
        }
        addToBattleLog(`${character.name} took ${damage} damage from Burn!`);
        updateHP();
      },
    },
  ];

  ///////////////////////////
  // Character Constructor //
  ///////////////////////////

  // This constructor uses a custom sprite
  function Character(name, charClass, sprite) {
    this.name = name;
    this.charClass = charClass;
    this.sprite = sprite;
  }

  /////////////////////
  // Test Characters //
  /////////////////////

  const player = new Character(
    "Cat Rogue",
    characters[1],
    characters[1].sprites.back.base
  );
  const enemy = new Character("Bad Guy", enemies[0], enemies[0].sprites);

  /////////////////////
  // Populate screen //
  /////////////////////

  // Position will be either hero or enemy
  function loadCharacter(character, position) {
    var hp = character.charClass.currentHP;
    var maxHp = character.charClass.baseMaxHP;
    $(`#${position}Name`).html(character.name);
    $(`#${position}HP`).html(hp);
    $(`#${position}MaxHP`).html(maxHp);
    updateHPBar(position, hp, maxHp);
    $(`#${position}Sprite`).attr("src", character.sprite);
  }

  // Updates the HP bar
  function updateHPBar(position, hp, maxHp) {
    $(`#${position}HPBar`).attr("value", hp);
    $(`#${position}HPBar`).attr("max", maxHp);
  }

  /////////////
  // Buttons //
  /////////////

  // Attack button
  $("#attack").text(player.charClass.moveset[0].name);
  $("#attack").click(function () {
    initializeBattle(0);
  });

  // Defend button
  $("#defend").text(player.charClass.moveset[1].name);
  $("#defend").click(function () {
    initializeBattle(1);
  });

  // Heal button
  $("#heal").text(player.charClass.moveset[2].name);
  $("#heal").click(function () {
    initializeBattle(2);
  });

  // Special button
  $("#special").text(player.charClass.moveset[3].name);
  $("#special").click(function () {
    initializeBattle(3);
  });

  ////////////
  // Battle //
  ////////////

  var currentStatuses = []; // [["status", turns left, target]]
  function initializeBattle(playerAction) {
    disableButtons();
    addToBattleLog("New Turn Started");
    var playerAtk = player.charClass.baseAttack + player.charClass.bonusAttack;
    var playerDef =
      player.charClass.baseDefense + player.charClass.bonusDefense;
    var playerSpd = player.charClass.baseSpeed + player.charClass.bonusSpeed;
    var playerDodge = player.charClass.baseDodge + player.charClass.bonusDodge;

    var enemyAtk = enemy.charClass.baseAttack + enemy.charClass.bonusAttack;
    var enemyDef = enemy.charClass.baseDefense + enemy.charClass.bonusDefense;
    var enemySpd = enemy.charClass.baseSpeed + enemy.charClass.bonusSpeed;
    var enemyDodge = enemy.charClass.baseDodge + enemy.charClass.bonusDodge;
    updateStatBlock(playerAtk, playerDef, playerSpd, playerDodge);

    console.log("Battle start", currentStatuses);
    resolveStatuses();
    if (playerSpd >= enemySpd) {
      setTimeout(function () {
        player.charClass.moveset[playerAction].effect();
      }, 2000 + 2000 * currentStatuses.length);
      setTimeout(function () {
        enemyTurn();
      }, 4000 + 2000 * currentStatuses.length);
    } else {
      setTimeout(function () {
        enemyTurn();
      }, 2000 + 2000 * currentStatuses.length);
      setTimeout(function () {
        player.charClass.moveset[playerAction].effect();
      }, 4000 + 2000 * currentStatuses.length);
    }

    setTimeout(function () {
      enableButtons();
      setBonusStatsZero(player);
      playerAtk = player.charClass.baseAttack + player.charClass.bonusAttack;
      playerDef = player.charClass.baseDefense + player.charClass.bonusDefense;
      playerSpd = player.charClass.baseSpeed + player.charClass.bonusSpeed;
      playerDodge = player.charClass.baseDodge + player.charClass.bonusDodge;
      updateStatBlock(playerAtk, playerDef, playerSpd, playerDodge);
      setBonusStatsZero(enemy);
      enemyAtk = enemy.charClass.baseAttack + enemy.charClass.bonusAttack;
      enemyDef = enemy.charClass.baseDefense + enemy.charClass.bonusDefense;
      enemySpd = enemy.charClass.baseSpeed + enemy.charClass.bonusSpeed;
      enemyDodge = enemy.charClass.baseDodge + enemy.charClass.bonusDodge;
    }, 6000);
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
      }, 2000);
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
    console.log("Enemy turn");
  }

  ////////////////////////////
  // Functions ran on build //
  ////////////////////////////

  loadCharacter(player, "player");
  loadCharacter(enemy, "enemy");

  updateStatBlock(
    player.charClass.baseAttack,
    player.charClass.baseDefense,
    player.charClass.baseSpeed,
    player.charClass.baseDodge
  );

  /////////////
  // Utility //
  /////////////

  // Function to append a message to the battle log
  function addToBattleLog(message) {
    $("#battleLog").append(`<div>${message}</div>`);
  }

  // Function to update the HP bars after a move
  function updateHP() {
    $("#playerHP").html(player.charClass.currentHP);
    $("#playerHPBar").attr("value", player.charClass.currentHP);
    $("#enemyHP").html(enemy.charClass.currentHP);
    $("#enemyHPBar").attr("value", enemy.charClass.currentHP);
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
    character.charClass.bonusAttack = 0;
    character.charClass.bonusDefense = 0;
    character.charClass.bonusSpeed = 0;
    character.charClass.bonusDodge = 0;
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

  console.log("Battle Script Loaded");
}); // End of document.ready

/*
Statuses
DMG:
Lethal Backstab (Rogue Attack)
Celestial Infusion (Wizard Heal)
Inflict Burn (Wizard Special)
Stats:
Guardian's Resolve (Fighter Defend)
Intimidating Aura (Fighter Special)
Acrobatic Evasion (Rogue Defend)
Shadow Step (Rogue Special)
Astral Ward (Wizard Defend)
Natural Camouflage (Ranger Defend)
Mark of the Predator (Ranger Special)
*/
