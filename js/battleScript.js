console.log("battleScript.js loaded");
function Character(name, maxHp, hp, attack, defense, speed, moveset) {
    this.name = name;
    this.maxHp = maxHp;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.moveset = moveset;
};

// Movesets

// Fighter
var fighterMoveset = [
    {name: "Stab", effect: fighterAttack},
    {name: "Dodge", effect: fighterDefend},
    {name: "Bandage", effect: fighterHeal},
    {name: "Backstab", effect: fighterSpecial}
];
function fighterAttack() {

}

function fighterDefend() {

}

function fighterHeal() {

}

function fighterSpecial() {

}

// Rogue
var rogueMoveset = [
    {name: "Stab", effect: rogueAttack},
    {name: "Dodge", effect: rogueDefend},
    {name: "Bandage", effect: rogueHeal},
    {name: "Backstab", effect: rogueSpecial}
];
function rogueAttack() {
    console.log("Rogue attack");
    enemy.hp -= player.attack;
    updateHP();
}

function rogueDefend() {
console.log("Rogue defend");
}

function rogueHeal() {
console.log("Rogue heal");
}

function rogueSpecial() {
console.log("Rogue special");
}

// Wizard
var wizardMoveset = [
    {name: "Stab", effect: wizardAttack},
    {name: "Dodge", effect: wizardDefend},
    {name: "Bandage", effect: wizardHeal},
    {name: "Backstab", effect: wizardSpecial}
];
function wizardAttack() {

}

function wizardDefend() {

}

function wizardHeal() {

}

function wizardSpecial() {

}

// Ranger
var rangerMoveset = [
    {name: "Stab", effect: rangerAttack},
    {name: "Dodge", effect: rangerDefend},
    {name: "Bandage", effect: rangerHeal},
    {name: "Backstab", effect: rangerSpecial}
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

// Test characters
const player = new Character("Cat Rogue :D", 150, 50, 40, 10, 50, rogueMoveset);
const enemy = new Character("Dragoon >:(", 70, 28, 40, 10, 50, rogueMoveset);

// Set player stats
$('#playerName').html(player.name);
$('#playerHP').html(player.hp);
$('#playerMaxHP').html(player.maxHp);
$('#playerHPBar').attr("value", player.hp);
$('#playerHPBar').attr("max", player.maxHp);

// Set player moveset
$('#attack').html(player.moveset[0].name);
$('#attack').click(player.moveset[0].effect);
$('#defend').html(player.moveset[1].name);
$('#defend').click(player.moveset[1].effect);
$('#heal').html(player.moveset[2].name);
$('#heal').click(player.moveset[2].effect);
$('#special').html(player.moveset[3].name);
$('#special').click(player.moveset[3].effect);

// Set enemy stats
$('#enemyName').html(enemy.name);
$('#enemyHP').html(enemy.hp);
$('#enemyMaxHP').html(enemy.maxHp);
$('#enemyHPBar').attr("value", enemy.hp);
$('#enemyHPBar').attr("max", enemy.maxHp);

function updateHP() {
    $('#playerHP').html(player.hp);
    $('#playerHPBar').attr("value", player.hp);
    $('#enemyHP').html(enemy.hp);
    $('#enemyHPBar').attr("value", enemy.hp);
}
