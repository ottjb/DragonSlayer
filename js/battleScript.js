/* 
Todo:
Battle Script
Moves for all characters
Add enemy moves
Add stat block bottom left
 */

/*
Contents:
Classes
Character
Putting Characters on screen
Buttons
Test Characters
Battle
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
          name: attack,
          effect: function () {
            console.log("attack");
          },
        },
        {
          name: defend,
          effect: function () {
            console.log("defend");
          },
        },
        {
          name: heal,
          effect: function () {
            console.log("heal");
          },
        },
        {
          name: special,
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

  ////////////////////
  // Status effects //
  ////////////////////

  var statuses = [
    {
      name: "burn",
      effect: function (character) {
        var damage = Math.round(character.charClass.baseMaxHP * 0.1);
        character.charClass.currentHP -= damage;
        addToBattleLog(`${character.name} took ${damage} damage from Burn!`);
        updateHP();
      },
    },
  ];

  ///////////////
  // Character //
  ///////////////

  // This constructor uses a custom sprite
  function Character(name, charClass, sprite) {
    this.name = name;
    this.charClass = charClass;
    this.sprite = sprite;
  }

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
    console.log(character.sprite, "Sprite loaded");
  }

  // Updates the HP bar
  function updateHPBar(position, hp, maxHp) {
    $(`#${position}HPBar`).attr("value", hp);
    $(`#${position}HPBar`).attr("max", maxHp);
  }

  // Updates the stat block
  function updateStatBlock(atk, def, spd, dodge) {
    //stopped here, getting stat block to update when called in initializeBattle
    console.log("Updating stat block");
    $("#playerAtkSt").html(atk);
    $("#playerDefSt").html(def);
    $("#playerSpdSt").html(spd);
    $("#playerDodgeSt").html(dodge);
  }

  /////////////
  // Buttons //
  /////////////

  // Attack button
  $("#attack").click(function () {
    initializeBattle(0);
  });

  // Defend button
  $("#defend").click(function () {
    initializeBattle(1);
  });

  // Heal button
  $("#heal").click(function () {
    initializeBattle(2);
  });

  // Special button
  $("#special").click(function () {
    initializeBattle(3);
  });

  /////////////////////
  // Test characters //
  /////////////////////

  const player = new Character(
    "Cat Rogue",
    characters[1],
    characters[1].sprites.back.base
  );
  const enemy = new Character(
    "Dragoon",
    characters[2],
    characters[2].sprites.front.base
  );

  ////////////
  // Battle //
  ////////////

  var currentStatuses = [["burn", 3, enemy]]; // [[status, turns left, target]
  function initializeBattle(playerAction) {
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

    console.log("Battle start");
    setTimeout(function () {
      resolveStatuses();
    }, 2000);
    player.charClass.moveset[playerAction].effect();
  }

  function resolveStatuses() {
    tempStatuses = [];
    // Loop through each status effect
    while (currentStatuses.length > 0) {
      var currentStatus = currentStatuses.pop();
      var statusName = currentStatus[0];
      var statusObject = statuses.find((status) => status.name === statusName);
      statusObject.effect(currentStatus[2]);
      currentStatus[1]--;
      if (currentStatus[1] > 0) {
        tempStatuses.push(currentStatus);
      }
    }
    console.log(enemy.charClass.currentHP);

    while (tempStatuses.length > 0) {
      currentStatuses.push(tempStatuses.pop());
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
  }

  // Function to update the HP bars after a move
  function updateHP() {
    $("#playerHP").html(player.charClass.currentHP);
    $("#playerHPBar").attr("value", player.charClass.currentHP);
    $("#enemyHP").html(enemy.charClass.currentHP);
    $("#enemyHPBar").attr("value", enemy.charClass.currentHP);
  }
});

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
