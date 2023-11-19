/* 
Todo:
Add stat block bottom left
Battle Script
Moves for fight, wizard, rogue
Finish off rogue moves
Add enemy moves
 */

/*
Contents:
Classes
Character
Putting Characters on screen
Buttons
Testing
*/

/////////////
// Classes //
/////////////

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
    baseDodgeChance: 0,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodgeChance: 0,
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
        base: "../img/rogue/noVariant/front/base.png",
        blue: "../img/rogue/noVariant/front/blue.png",
        purple: "../img/rogue/noVariant/front/purple.png",
        red: "../img/rogue/noVariant/front/red.png",
      },
      back: {
        base: "../img/rogue/noVariant/back/base.png",
        blue: "../img/rogue/noVariant/back/blue.png",
        purple: "../img/rogue/noVariant/back/purple.png",
        red: "../img/rogue/noVariant/back/red.png",
      },
      frontVariant: {
        base: "../img/rogue/variant/front/base.png",
        blue: "../img/rogue/variant/front/blue.png",
        purple: "../img/rogue/variant/front/purple.png",
        red: "../img/rogue/variant/front/red.png",
      },
      backVariant: {
        base: "../img/rogue/variant/back/base.png",
        blue: "../img/rogue/variant/back/blue.png",
        purple: "../img/rogue/variant/back/purple.png",
        red: "../img/rogue/variant/back/red.png",
      },
    },
    baseMaxHP: 150,
    currentHP: 150,
    baseAttack: 20,
    baseDefense: 10,
    baseSpeed: 50,
    baseDodgeChance: 0,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodgeChance: 0,
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
        base: "../img/wizard/noVariant/front/base.png",
      },
      back: {
        base: "../img/wizard/noVariant/back/base.png",
      },
      frontVariant: {
        base: "../img/wizard/variant/front/base.png",
      },
      backVariant: {
        base: "../img/wizard/variant/back/base.png",
      },
    },
    baseMaxHP: 150,
    currentHP: 150,
    baseAttack: 20,
    baseDefense: 10,
    baseSpeed: 50,
    baseDodgeChance: 0,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodgeChance: 0,
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
        base: "../img/ranger/front/base.png",
        blue: "../img/ranger/front/blue.png",
        purple: "../img/ranger/front/purple.png",
        white: "../img/ranger/front/white.png",
      },
      back: {
        base: "../img/ranger/back/base.png",
        blue: "../img/ranger/back/blue.png",
        purple: "../img/ranger/back/purple.png",
        white: "../img/ranger/back/white.png",
      },
    },
    baseMaxHP: 150,
    currentHP: 150,
    baseAttack: 20,
    baseDefense: 10,
    baseSpeed: 50,
    baseDodgeChance: 0,
    bonusAttack: 0,
    bonusDefense: 0,
    bonusSpeed: 0,
    bonusDodgeChance: 0,
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

///////////////
// Character //
///////////////

// This constructor uses a custom sprite
function Character(name, charClass, sprite) {
  this.name = name;
  this.charClass = charClass;
  this.sprite = sprite;
}

//////////////////////////////////
// Putting Characters on screen //
//////////////////////////////////

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

/////////////
// Buttons //
/////////////

// Attack button
$("#attack").click(function () {
  player.charClass.moveset[0].effect();
});

// Defend button
$("#defend").click(function () {
  player.charClass.moveset[1].effect();
});

// Heal button
$("#heal").click(function () {
  player.charClass.moveset[2].effect();
});

// Special button
$("#special").click(function () {
  player.charClass.moveset[3].effect();
});

/////////////
// Testing //
/////////////

const player = new Character(
  "Cat Rogue :D",
  characters[1],
  characters[1].sprites.back.base
);
const enemy = new Character(
  "Dragoon >:(",
  characters[2],
  characters[2].sprites.front.base
);

loadCharacter(player, "player");
loadCharacter(enemy, "enemy");

/*
// All of this runs when the page loads
// Set player stats
$("#playerName").html(player.name);
$("#playerSprite").attr(
  "src",
  setSprite(
    player.sprite[0],
    player.sprite[1],
    player.sprite[2],
    player.sprite[3]
  )
);
$("#playerHP").html(player.hp);
$("#playerMaxHP").html(player.maxHp);
$("#playerHPBar").attr("value", player.hp);
$("#playerHPBar").attr("max", player.maxHp);

// Set player moveset
$("#attack").html(player.moveset[0].name);
$("#attack").click(function () {
  battle(player.moveset[0].effect);
});
$("#defend").html(player.moveset[1].name);
$("#defend").click(function () {
  battle(player.moveset[1].effect);
});
$("#heal").html(player.moveset[2].name);
$("#heal").click(function () {
  battle(player.moveset[2].effect);
});
$("#special").html(player.moveset[3].name);
$("#special").click(function () {
  battle(player.moveset[3].effect);
});

// Set enemy stats
$("#enemyName").html(enemy.name);
$("#enemySprite").attr(
  "src",
  setSprite(enemy.sprite[0], enemy.sprite[1], enemy.sprite[2], enemy.sprite[3])
);
$("#enemyHP").html(enemy.hp);
$("#enemyMaxHP").html(enemy.maxHp);
$("#enemyHPBar").attr("value", enemy.hp);
$("#enemyHPBar").attr("max", enemy.maxHp);
*/
function updateHP() {
  $("#playerHP").html(player.hp);
  $("#playerHPBar").attr("value", player.hp);
  $("#enemyHP").html(enemy.hp);
  $("#enemyHPBar").attr("value", enemy.hp);
}

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

// Battle script
var dmgStatus = [];
var statStatus = [];
function battle(actionChosen) {
  console.log("Battle start");
  console.log(actionChosen);
  var queue = [];
  //enqueue dmging status
  //playerAction();
  $(".attacks-container").addClass("hide");

  var enemyAction = rogueAttack;
  //enemyAction();
  //enqueue actions based on speed
  //enqueue statuses
  $.each(dmgStatus, function (index, value) {
    queue.push(value);
  });
  if (player.speed > enemy.speed) {
    queue.enqueue(actionChosen);
    queue.enqueue(enemyAction);
  } else if (player.speed < enemy.speed) {
    queue.enqueue(enemyAction);
    queue.enqueue(actionChosen);
  }

  console.log(queue);

  $.each(statStatus, function (index, value) {
    queue.enqueue(value);
  });

  while (queue.length != 0) {
    var currentAction = queue.pop();
    currentAction();
    console.log(currentAction);
  }
  //checkHealth();
  /*
  
Speed check
Whoever wins goes first
If speed is equal, player goes first
Player turn
Enemy turn (will have dialogue of their action)
Enemy can either attack or defend, chances to defend increase as health decreases
Recursively call battle() until one character's health is 0
*/
}
