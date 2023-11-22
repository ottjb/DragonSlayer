/* 
Todo:
Battle Script
CREATE FUNCTION THAT DOES THE DAMAGE FOR FUNCTIONS (WILL MAKE EASIER TO FIGURE OUT IF BATTLE ENDS, AND SHORTENS CODE)
Moves for all characters
Add enemy moves
Add stat block bottom left
 */

// stopped while working on bandit moveset

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
  // Fighter
  var fighter = {
    name: "fighter",
    sprites: {},
    baseMaxHP: 100,
    currentHP: 100,
    baseAttack: 15,
    baseDefense: 10,
    baseSpeed: 8,
    baseDodge: 5,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
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
          player.charClass.bonusAttack += Math.round(
            player.charClass.baseAttack * 0.2
          );
          player.charClass.bonusDefense += Math.round(
            player.charClass.baseDefense * 0.5
          );
          updateStatBlock(
            player.charClass.baseAttack + player.charClass.bonusAttack,
            player.charClass.baseDefense + player.charClass.bonusDefense,
            player.charClass.baseSpeed + player.charClass.bonusSpeed,
            player.charClass.baseDodge + player.charClass.bonusDodge
          );
          currentStatuses.push(["guardian's resolve", 2, player]);
        },
      },
      {
        name: "Vital Surge",
        effect: function (stats) {
          addToBattleLog(`${player.name} uses Vital Surge!`);
          var heal = Math.round(player.charClass.baseMaxHP * 0.3);
          doHeal(player, heal);
        },
      },
      { name: special, effect: function () {} },
    ],
  };

  // Rogue
  var rogue = {
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
    baseMaxHP: 80,
    currentHP: 80,
    baseAttack: 12,
    baseDefense: 8,
    baseSpeed: 12,
    baseDodge: 15,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
    moveset: [
      {
        name: "Lethal Backstab",
        effect: function (stats) {
          console.log(stats.playerDodge);
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
            console.log("bleed", currentStatuses);
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
          player.charClass.bonusDodge += Math.round(
            player.charClass.baseDodge * 3
          );
          player.charClass.bonusSpeed += Math.round(
            player.charClass.baseSpeed * 0.1
          );
          updateStatBlock(
            player.charClass.baseAttack + player.charClass.bonusAttack,
            player.charClass.baseDefense + player.charClass.bonusDefense,
            player.charClass.baseSpeed + player.charClass.bonusSpeed,
            player.charClass.baseDodge + player.charClass.bonusDodge
          );
          currentStatuses.push(["acrobatic evasion", 2, player]);
        },
      },
      {
        name: "Quick Patch-Up",
        effect: function () {
          addToBattleLog(`${player.name} uses Quick Patch-Up!`);
          var heal = Math.round(player.charClass.baseMaxHP * 0.15);
          doHeal(player, heal);
          player.charClass.bonusDodge += player.charClass.baseDodge;

          updateStatBlock(
            player.charClass.baseAttack + player.charClass.bonusAttack,
            player.charClass.baseDefense + player.charClass.bonusDefense,
            player.charClass.baseSpeed + player.charClass.bonusSpeed,
            player.charClass.baseDodge + player.charClass.bonusDodge
          );
          currentStatuses.push(["quick patch-up", 2, player]);
        },
      },
      {
        name: "Shadow Step",
        effect: function () {
          console.log("special");
        },
      },
    ],
  };

  // Wizard
  var wizard = {
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
    baseMaxHP: 70,
    currentHP: 70,
    baseAttack: 18,
    baseDefense: 6,
    baseSpeed: 10,
    baseDodge: 10,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
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
          player.charClass.bonusDefense += Math.round(
            player.charClass.baseDefense * 0.5
          );
          updateStatBlock(
            player.charClass.baseAttack + player.charClass.bonusAttack,
            player.charClass.baseDefense + player.charClass.bonusDefense,
            player.charClass.baseSpeed + player.charClass.bonusSpeed,
            player.charClass.baseDodge + player.charClass.bonusDodge
          );
          currentStatuses.push(["astral ward", 2, player]);
        },
      },
      { name: "Celestial Infusion", effect: function () {
        addToBattleLog(`${player.name} uses Celestial Infusion!`);
        var heal = Math.round(player.charClass.baseMaxHP * 0.1);
        doHeal(player, heal);
        currentStatuses.push(["celestial infusion", 3, player]);
      } },
      { name: special, effect: function () {} },
    ],
  };

  // Ranger
  var ranger = {
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
    baseMaxHP: 90,
    currentHP: 90,
    baseAttack: 14,
    baseDefense: 9,
    baseSpeed: 10,
    baseDodge: 12,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodge: 0,
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
          player.charClass.bonusDodge += 100 - player.charClass.baseDodge;
          updateStatBlock(
            player.charClass.baseAttack + player.charClass.bonusAttack,
            player.charClass.baseDefense + player.charClass.bonusDefense,
            player.charClass.baseSpeed + player.charClass.bonusSpeed,
            player.charClass.baseDodge + player.charClass.bonusDodge
          );
          currentStatuses.push(["natural camoflage", 1, player]);
        },
      },
      { name: "Natural Remedy", effect: function () {
        addToBattleLog(`${player.name} uses Natural Remedy!`);
        var heal = Math.round(player.charClass.baseMaxHP * 0.2);
        doHeal(player, heal);
      } },
      { name: special, effect: function () {} },
    ],
  };

  /////////////
  // Enemies //
  /////////////

  // Bandit
  var bandit = {
    name: "bandit",
    sprites: "img/ranger/front/white.png",
    baseMaxHP: 80,
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
        name: "Slash",
        effect: function (character) {
          damage =
            20 +
            Math.round(
              (enemy.charClass.baseAttack + enemy.charClass.bonusAttack) * 1.15
            );
        },
      },
      { name: heal, effect: function () {} },
    ],
  };

  // Goblin
  var goblin = {
    name: "goblin",
    sprites: {},
    baseMaxHP: 70,
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
        name: attack,
        effect: function () {},
      },
      { name: heal, effect: function () {} },
    ],
  };

  // Undead
  var undead = {
    name: "undead",
    sprites: {},
    baseMaxHP: 90,
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
        name: attack,
        effect: function () {},
      },
      { name: heal, effect: function () {} },
    ],
  };

  // Dragon
  var dragon = {
    name: "dragon",
    sprites: {},
    baseMaxHP: 150,
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
        name: attack,
        effect: function () {},
      },
      { name: heal, effect: function () {} },
    ],
  };

  ////////////////////
  // Status effects //
  ////////////////////

  statuses = [
    // Bleed
    {
      name: "bleed",
      effect: function (character) {
        var damage = Math.round(player.charClass.baseAttack * 0.5);
        addToBattleLog(`${character.name} is still bleeding!`);
        doDamage(character, damage);
      },
    },

    // Guardian's Resolve
    {
      name: "guardian's resolve",
      effect: function (character) {
        addToBattleLog(
          `${character.name}'s Guardian's Resolve is still active!`
        );
        character.charClass.bonusAttack += Math.round(
          character.charClass.baseAttack * 0.2
        );
        character.charClass.bonusDefense += Math.round(
          character.charClass.baseDefense * 0.5
        );
        updateStatBlock(
          player.charClass.baseAttack + player.charClass.bonusAttack,
          player.charClass.baseDefense + player.charClass.bonusDefense,
          player.charClass.baseSpeed + player.charClass.bonusSpeed,
          player.charClass.baseDodge + player.charClass.bonusDodge
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
        player.charClass.bonusDodge += Math.round(
          player.charClass.baseDodge * 3
        );
        player.charClass.bonusSpeed += Math.round(
          player.charClass.baseSpeed * 0.1
        );
        updateStatBlock(
          player.charClass.baseAttack + player.charClass.bonusAttack,
          player.charClass.baseDefense + player.charClass.bonusDefense,
          player.charClass.baseSpeed + player.charClass.bonusSpeed,
          player.charClass.baseDodge + player.charClass.bonusDodge
        );
      },
    },

    // Astral Ward
    {
      name: "astral ward",
      effect: function (character) {
        addToBattleLog(`${character.name}'s Astral Ward is still active!`);
        player.charClass.bonusDefense += Math.round(
          player.charClass.baseDefense * 0.5
        );
        updateStatBlock(
          player.charClass.baseAttack + player.charClass.bonusAttack,
          player.charClass.baseDefense + player.charClass.bonusDefense,
          player.charClass.baseSpeed + player.charClass.bonusSpeed,
          player.charClass.baseDodge + player.charClass.bonusDodge
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
        player.charClass.bonusDodge += 100 - player.charClass.baseDodge;
        updateStatBlock(
          player.charClass.baseAttack + player.charClass.bonusAttack,
          player.charClass.baseDefense + player.charClass.bonusDefense,
          player.charClass.baseSpeed + player.charClass.bonusSpeed,
          player.charClass.baseDodge + player.charClass.bonusDodge
        );
      },
    },

    // Quick Patch-Up
    {
      name: "quick patch-up",
      effect: function (character) {
        addToBattleLog(`${character.name}'s Quick Patch-Up is still active!`);
        player.charClass.bonusDodge += Math.round(
          player.charClass.baseDodge * 0.2
        );
        updateStatBlock(
          player.charClass.baseAttack + player.charClass.bonusAttack,
          player.charClass.baseDefense + player.charClass.bonusDefense,
          player.charClass.baseSpeed + player.charClass.bonusSpeed,
          player.charClass.baseDodge + player.charClass.bonusDodge
        );
      },
    },

    // Celestial Infusion
    {
      name: "celestial infusion",
      effect: function (character) {
        addToBattleLog(`${character.name}'s Celestial Infusion is still active!`);
        var heal = Math.round(player.charClass.baseMaxHP * 0.1);
        doHeal(player, heal);
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

  //const player = new Character("Fighter", fighter, ranger.sprites.back.base);
  const player = new Character("Cat Rogue", rogue, rogue.sprites.back.base);
  //const player = new Character("Cat Rogue", wizard, wizard.sprites.back.base);
  //const player = new Character("Cat Rogue", ranger, ranger.sprites.back.base);
  const enemy = new Character("Bad Guy", bandit, bandit.sprites);

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
        player.charClass.moveset[playerAction].effect(calcStats());
      }, 1000 + 1000 * currentStatuses.length);
      setTimeout(function () {
        enemyTurn(calcStats());
      }, 2000 + 1000 * currentStatuses.length);
    } else {
      setTimeout(function () {
        enemyTurn(calcStats());
      }, 1000 + 1000 * currentStatuses.length);
      setTimeout(function () {
        player.charClass.moveset[playerAction].effect(calcStats());
      }, 2000 + 1000 * currentStatuses.length);
    }

    setTimeout(function () {
      enableButtons();
      setBonusStatsZero(player);
      setBonusStatsZero(enemy);
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
    console.log("Enemy turn");
    var enemyPercentMissingHP =
      (1 - enemy.charClass.currentHP / enemy.charClass.baseMaxHP) * 100;
    var chanceToHeal = Math.round(enemyPercentMissingHP);
    if (genRandomNumber(1, 100) > chanceToHeal) {
      console.log("Attack");
      enemy.charClass.moveset[0].effect();
    } else {
      console.log("Heal");
      enemy.charClass.moveset[1].effect();
    }
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
    var logContainer = document.getElementById("battleLog");
    logContainer.scrollTop = logContainer.scrollHeight;
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

  function doDamage(character, damage) {
    if (character.charClass.currentHP - damage < 0) {
      character.charClass.currentHP = 0;
    } else {
      character.charClass.currentHP -= damage;
    }
    addToBattleLog(`${character.name} took ${damage} damage!`);
    updateHP();
  }

  function doHeal(character, heal) {
    if (character.charClass.currentHP + heal > character.charClass.baseMaxHP) {
      character.charClass.currentHP = character.charClass.baseMaxHP;
    } else {
      character.charClass.currentHP += heal;
    }
    addToBattleLog(`${character.name} healed for ${heal} HP!`);
    updateHP();
  }

  function checkDodged(dodge) {
    if (genRandomNumber(1, 100) < dodge) {
      return true;
    }
  }

  function calcStats() {
    var stats = {
      playerAtk: player.charClass.baseAttack + player.charClass.bonusAttack,
      playerDef: player.charClass.baseDefense + player.charClass.bonusDefense,
      playerSpd: player.charClass.baseSpeed + player.charClass.bonusSpeed,
      playerDodge: player.charClass.baseDodge + player.charClass.bonusDodge,
      enemyAtk: enemy.charClass.baseAttack + enemy.charClass.bonusAttack,
      enemyDef: enemy.charClass.baseDefense + enemy.charClass.bonusDefense,
      enemySpd: enemy.charClass.baseSpeed + enemy.charClass.bonusSpeed,
      enemyDodge: enemy.charClass.baseDodge + enemy.charClass.bonusDodge,
    };
    return stats;
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
