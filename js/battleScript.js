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
          if (battleOver()) {
            return;
          }
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Guardian's Resolve!`);
          player.charClass.bonusAttack += Math.round(
            player.charClass.baseAttack * 0.2
          );
          player.charClass.bonusDefense += Math.round(
            player.charClass.baseDefense * 0.5
          );
          addToBattleLog(`${player.name}'s Attack and Defense increased!`);
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Vital Surge!`);
          var heal = Math.round(player.charClass.baseMaxHP * 0.3);
          doHeal(player, heal);
        },
      },
      {
        name: "Intimidating Aura",
        effect: function () {
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Intimidating Aura!`);
          enemy.charClass.bonusAttack -= Math.round(
            enemy.charClass.baseAttack * 0.15
          );
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
          if (battleOver()) {
            return;
          }
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Acrobatic Evasion!`);
          player.charClass.bonusDodge += Math.round(
            player.charClass.baseDodge * 3
          );
          player.charClass.bonusSpeed += Math.round(
            player.charClass.baseSpeed * 0.1
          );
          addToBattleLog(`${player.name}'s Dodge and Speed increased!`);
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Quick Patch-Up!`);
          var heal = Math.round(player.charClass.baseMaxHP * 0.15);
          doHeal(player, heal);
          player.charClass.bonusDodge += player.charClass.baseDodge;
          addToBattleLog(`${player.name}'s Dodge increased!`);
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Shadow Step!`);
          player.charClass.bonusAttack += Math.round(
            player.charClass.baseAttack * 0.3
          );
          player.charClass.bonusSpeed += Math.round(
            player.charClass.baseSpeed * 0.2
          );
          addToBattleLog(`${player.name}'s Attack and Speed increased!`);
          updateStatBlock(
            player.charClass.baseAttack + player.charClass.bonusAttack,
            player.charClass.baseDefense + player.charClass.bonusDefense,
            player.charClass.baseSpeed + player.charClass.bonusSpeed,
            player.charClass.baseDodge + player.charClass.bonusDodge
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
          if (battleOver()) {
            return;
          }
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Astral Ward!`);
          player.charClass.bonusDefense += Math.round(
            player.charClass.baseDefense * 0.5
          );
          addToBattleLog(`${player.name}'s Defense increased!`);
          updateStatBlock(
            player.charClass.baseAttack + player.charClass.bonusAttack,
            player.charClass.baseDefense + player.charClass.bonusDefense,
            player.charClass.baseSpeed + player.charClass.bonusSpeed,
            player.charClass.baseDodge + player.charClass.bonusDodge
          );
          currentStatuses.push(["astral ward", 2, player]);
        },
      },
      {
        name: "Celestial Infusion",
        effect: function () {
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Celestial Infusion!`);
          var heal = Math.round(player.charClass.baseMaxHP * 0.1);
          doHeal(player, heal);
          currentStatuses.push(["celestial infusion", 3, player]);
        },
      },
      {
        name: "Inflict Burn",
        effect: function () {
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Inflict Burn!`);
          var damage = Math.round(player.charClass.baseAttack * 0.2);
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
          if (battleOver()) {
            return;
          }
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Natural Camoflage!`);
          player.charClass.bonusDodge += 100 - player.charClass.baseDodge;
          addToBattleLog(`${player.name}'s Dodge increased!`);
          updateStatBlock(
            player.charClass.baseAttack + player.charClass.bonusAttack,
            player.charClass.baseDefense + player.charClass.bonusDefense,
            player.charClass.baseSpeed + player.charClass.bonusSpeed,
            player.charClass.baseDodge + player.charClass.bonusDodge
          );
          currentStatuses.push(["natural camoflage", 1, player]);
        },
      },
      {
        name: "Nature's Blessing",
        effect: function () {
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Nature's Blessing!`);
          var heal = Math.round(player.charClass.baseMaxHP * 0.2);
          doHeal(player, heal);
          currentStatuses.push(["nature's blessing", 2, player]);
        },
      },
      {
        name: "Mark of the Predator",
        effect: function () {
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${player.name} uses Mark of the Predator!`);
          enemy.charClass.bonusDefense -= Math.round(
            enemy.charClass.baseDefense * 0.1
          );
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
        name: "Sneak Strike",
        effect: function (stats) {
          if (battleOver()) {
            return;
          }
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${enemy.name} uses Stolen Potion!`);
          var heal = Math.round(enemy.charClass.baseMaxHP * 0.2);
          doHeal(enemy, heal);
        },
      },
    ],
  };

  // Goblin
  var goblin = {
    name: "Goblin",
    sprite: "img/enemy/goblin.png",
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
        name: "Vicious Strike",
        effect: function (stats) {
          if (battleOver()) {
            return;
          }
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${enemy.name} uses Herbal Remedy!`);
          var heal = Math.round(enemy.charClass.baseMaxHP * 0.25);
          doHeal(enemy, heal);
        },
      },
    ],
  };

  // Skeleton
  var skeleton = {
    name: "Skeleton",
    sprite: "img/enemy/skeleton.png",
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
        name: "Soul Siphon",
        effect: function (stats) {
          if (battleOver()) {
            return;
          }
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${enemy.name} uses Soul Mend!`);
          var heal = Math.round(enemy.charClass.baseMaxHP * 0.3);
          doHeal(enemy, heal);
        },
      },
    ],
  };

  // Dragon
  var dragon = {
    name: "Dragon",
    sprite: "img/enemy/dragon.png",
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
        name: "Infernal Breath",
        effect: function (stats) {
          if (battleOver()) {
            return;
          }
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
          if (battleOver()) {
            return;
          }
          addToBattleLog(`${enemy.name} uses Draconian Renewal!`);
          var heal = Math.round(enemy.charClass.baseMaxHP * 0.4);
          doHeal(enemy, heal);
        },
      },
    ],
  };

  // Create the enemy

  //var currentEnemy = enemyArray[userData.gameState.currentEnemy - 2];
  var currentEnemy = enemyArray[0];

  function Enemy(currentEnemy) {
    this.name = currentEnemy.name;
    this.sprite = currentEnemy.sprite;
    this.maxHP = currentEnemy.baseMaxHP;
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

  var enemy = new Enemy(eval(currentEnemy.toLowerCase()));
  console.log(enemy);

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
        addToBattleLog(
          `${character.name}'s Celestial Infusion is still active!`
        );
        var heal = Math.round(player.charClass.baseMaxHP * 0.1);
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
        player.charClass.bonusAttack += Math.round(
          player.charClass.baseAttack * 0.3
        );
        updateStatBlock(
          player.charClass.baseAttack + player.charClass.bonusAttack,
          player.charClass.baseDefense + player.charClass.bonusDefense,
          player.charClass.baseSpeed + player.charClass.bonusSpeed,
          player.charClass.baseDodge + player.charClass.bonusDodge
        );
      },
    },

    // Intimidating Aura
    {
      name: "intimidating aura",
      effect: function (character) {
        addToBattleLog(`${character.name} is still intimidated!`);
        enemy.charClass.bonusAttack -= Math.round(
          enemy.charClass.baseAttack * 0.15
        );
      },
    },

    // Shadow Step
    {
      name: "shadow step",
      effect: function (character) {
        addToBattleLog(`${character.name}'s Shadow Step is still active!`);
        player.charClass.bonusAttack += Math.round(
          player.charClass.baseAttack * 0.3
        );
        player.charClass.bonusSpeed += Math.round(
          player.charClass.baseSpeed * 0.2
        );
        updateStatBlock(
          player.charClass.baseAttack + player.charClass.bonusAttack,
          player.charClass.baseDefense + player.charClass.bonusDefense,
          player.charClass.baseSpeed + player.charClass.bonusSpeed,
          player.charClass.baseDodge + player.charClass.bonusDodge
        );
      },
    },

    // Burn
    {
      name: "burn",
      effect: function (character) {
        addToBattleLog(`${character.name} is still burning!`);
        var damage = Math.round(player.charClass.baseAttack * 0.2);
        doDamage(character, damage);
      },
    },

    // Mark of the Predator
    {
      name: "mark of the predator",
      effect: function (character) {
        addToBattleLog(`${character.name} is still marked!`);
        enemy.charClass.bonusDefense -= Math.round(
          enemy.charClass.baseDefense * 0.1
        );
      },
    },

    // Infernal Breath
    {
      name: "infernal breath",
      effect: function (character) {
        addToBattleLog(`${character.name} is still burning!`);
        var damage = Math.round(enemy.charClass.baseAttack * 0.2);
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
      $(`#playerName`).html(currentUser);
      $(`#playerHP`).html(userData.character.currentHP);
      $(`#playerMaxHP`).html(userData.character.maxHP);
      updateHPBar(
        position,
        userData.character.currentHP,
        userData.character.baseMaxHP
      );
      $(`#playerSprite`).attr("src", userData.character.sprite.back);
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

  switch (userData.character.class.toLowerCase()) {
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
        enemyTurn();
      }, 2000 + 1000 * currentStatuses.length);
    } else {
      setTimeout(function () {
        enemyTurn();
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
    var enemyPercentMissingHP = (1 - enemy.currentHP / enemy.baseMaxHP) * 100;
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

  updateStatBlock(
    userData.character.attack,
    userData.character.defense,
    userData.character.speed,
    userData.character.dodge
  );

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

  // stopped here, updating to make work like doheal
  function doDamage(character, damage) {
    if (character.charClass.currentHP - damage < 0) {
      addToBattleLog(
        `${character.name} took ${character.charClass.currentHP} damage!`
      );
      character.charClass.currentHP = 0;
    } else {
      character.charClass.currentHP -= damage;
      addToBattleLog(`${character.name} took ${damage} damage!`);
    }
    updateHP();
  }

  function doHeal(unit, heal) {
    if (unit === "player") {
      if (userData.character.currentHP + heal > userData.character.maxHP) {
        addToBattleLog(
          `${currentUser} healed for ${userData.character.maxHP - heal} HP!`
        );
        userData.character.currentHP = userData.character.maxHP;
      } else {
        addToBattleLog(`${currentUser} healed for ${heal} HP!`);
        userData.character.currentHP += heal;
      }
    } else {
      if (enemy.currentHP + heal > enemy.maxHP) {
        addToBattleLog(`${enemy.name} healed for ${enemy.maxHP - heal} HP!`);
        enemy.currentHP = enemy.maxHP;
      } else {
        addToBattleLog(`${enemy.name} healed for ${heal} HP!`);
        enemy.currentHP += heal;
      }
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
      playerAtk: userData.character.attack + userData.character.bonusAttack,
      playerDef: userData.character.defense + userData.character.bonusDefense,
      playerSpd: userData.character.speed + userData.character.bonusSpeed,
      playerDodge: userData.character.dodge + userData.character.bonusDodge,
      enemyAtk: enemy.baseAttack + enemy.bonusAttack,
      enemyDef: enemy.baseDefense + enemy.bonusDefense,
      enemySpd: enemy.baseSpeed + enemy.bonusSpeed,
      enemyDodge: enemy.baseDodge + enemy.bonusDodge,
    };
    return stats;
  }

  function battleOver() {
    if (userData.character.currentHP <= 0) {
      addToBattleLog(`${currentUser} has been defeated!`);
      return true;
    } else if (enemy.currentHP <= 0) {
      addToBattleLog(`${enemy.name} has been defeated!`);
      return true;
    }
    return false;
  }

  console.log("Battle Script Loaded");
} // End of startGame()
