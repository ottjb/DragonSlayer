/* 
Todo:
Add stat block bottom left
Battle Script
Moves for fight, wizard, rogue
Finish off rogue moves
Add enemy moves
 */

console.log("battleScript.js loaded");
function Character(
  name,
  sprite,
  maxHp,
  hp,
  attack,
  defense,
  speed,
  dodgeChance,
  moveset
) {
  this.name = name;
  this.sprite = sprite;
  this.maxHp = maxHp;
  this.hp = hp;
  this.attack = attack;
  this.defense = defense;
  this.speed = speed;
  this.dodgeChance = dodgeChance;
  this.moveset = moveset;
}

// Movesets

// Fighter
var fighterMoveset = [
  { name: "Stab", effect: fighterAttack },
  { name: "Dodge", effect: fighterDefend },
  { name: "Bandage", effect: fighterHeal },
  { name: "Backstab", effect: fighterSpecial },
];
function fighterAttack() {}

function fighterDefend() {}

function fighterHeal() {}

function fighterSpecial() {}

// Rogue
var rogueMoveset = [
  { name: "Stab", effect: rogueAttack },
  { name: "Dodge", effect: rogueDefend },
  { name: "Bandage", effect: rogueHeal },
  { name: "Shadow Step", effect: rogueSpecial },
];
function rogueAttack() {
  var attackRoll = Math.floor(Math.random() * 100);
  if (attackRoll <= enemy.dodgeChance) {
    console.log("Enemy dodged");
    return;
  }
  var baseDamage = 10;
  if (player.attack - enemy.defense > 0) {
    enemy.hp -= baseDamage + (player.attack - enemy.defense);
  } else {
    enemy.hp -= baseDamage;
  }

  if (enemy.hp < 0) {
    enemy.hp = 0;
  }
  updateHP();
  console.log("Rogue attack", enemy.hp);
  return;
}

function rogueDefend() {
  player.dodgeChance += 75;
  player.status = defend;
  console.log("Rogue defend", player.dodgeChance);
  return;
}

function rogueHeal() {
  // heal 25% of missing hp
  player.hp += Math.round((player.maxHp - player.hp) * 0.25);
  if (player.hp > player.maxHp) {
    player.hp = player.maxHp;
  }
  console.log("Rogue heal", player.hp);
  updateHP();
  return;
}

function rogueSpecial() {
  player.speed = 100;
  player.status = special;
  console.log("Rogue Special", player.speed);
  return;
}

// Wizard
var wizardMoveset = [
  { name: "Stab", effect: wizardAttack },
  { name: "Dodge", effect: wizardDefend },
  { name: "Bandage", effect: wizardHeal },
  { name: "Backstab", effect: wizardSpecial },
];
function wizardAttack() {}

function wizardDefend() {}

function wizardHeal() {}

function wizardSpecial() {}

// Ranger
var rangerMoveset = [
  { name: "Stab", effect: rangerAttack },
  { name: "Dodge", effect: rangerDefend },
  { name: "Bandage", effect: rangerHeal },
  { name: "Backstab", effect: rangerSpecial },
];
function rangerAttack() {
  console.log("Ranger attack");
}

function rangerDefend() {
  console.log("Ranger defend");
}

function rangerHeal() {
  console.log("Ranger heal");
}

function rangerSpecial() {
  console.log("Ranger special");
}

/*
// Sprite color matrix
const spriteSheet = [
  [, , ,],
  [
    "../img/catrouge-basecolor.png",
    "../img/catrouge-blue.png",
    "../img/catrouge-purple.png",
    "../img/catrouge-red.png",
  ],
  [, , ,],
  [, , ,],
];
*/

// Sprite Sheets
const spriteClass = ["fighter", "rogue", "wizard", "ranger"];
const spriteVariant = ["noVariant", "variant"];
const direction = ["front", "back"];
const spriteColor = ["base", "blue", "purple", "red"];

function setSprite(spriteClassIndex, variantIndex, directionIndex, colorIndex) {
  var sprite = `../img/${spriteClass[spriteClassIndex]}/${spriteVariant[variantIndex]}/${direction[directionIndex]}/${spriteColor[colorIndex]}.png`;
  return sprite;
}

// Test characters
const player = new Character(
  "Cat Rogue :D",
  [1, 0, 1, 2],
  150 /*maxHp*/,
  50 /*hp*/,
  20 /*attack*/,
  10 /*defense*/,
  50 /*speed*/,
  0 /*dodgeChance*/,
  rogueMoveset
);
const enemy = new Character(
  "Dragoon >:(",
  [1, 1, 0, 3],
  70 /*maxHp*/,
  28 /*hp*/,
  40 /*attack*/,
  40 /*defense*/,
  50 /*speed*/,
  10 /*dodgeChance*/,
  rogueMoveset
);

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
$("#attack").click(player.moveset[0].effect);
$("#defend").html(player.moveset[1].name);
$("#defend").click(player.moveset[1].effect);
$("#heal").html(player.moveset[2].name);
$("#heal").click(player.moveset[2].effect);
$("#special").html(player.moveset[3].name);
$("#special").click(player.moveset[3].effect);

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

function updateHP() {
  $("#playerHP").html(player.hp);
  $("#playerHPBar").attr("value", player.hp);
  $("#enemyHP").html(enemy.hp);
  $("#enemyHPBar").attr("value", enemy.hp);
}

battle();

// Battle script
function battle() {
  console.log("Battle start");
  /*
Battle start
Speed check
Whoever wins goes first
If speed is equal, player goes first
Player turn
Enemy turn (will have dialogue of their action)
Enemy can either attack or defend, chances to defend increase as health decreases
Recursively call battle() until one character's health is 0
*/
}
