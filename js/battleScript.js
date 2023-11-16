console.log("battleScript.js loaded");
function Character (name, maxHp, hp, attack, defense, speed, moveset) {
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
var player = new Character("Car", 100, 100, 40, 10, 50, rogueMoveset);
var enemy = new Character("Dragoon", 100, 100, 40, 10, 50, rogueMoveset);

// Set player stats
$('#playerName').innerHTML = player.name;
$('#playerHp').innerHTML = player.hp;
$('#playerMaxHp').innerHTML = player.maxHp;
$('#playerHPBar').setAttribute("progress", player.hp);
$('#playerHPBar').setAttribute("max", player.maxHp);

// Set player moveset
$('#attack').innerHTML = player.moveset[0].name;
$('#attack').click(player.moveset[0].effect)
$('#defend').innerHTML = player.moveset[1].name;
$('#defend').click(player.moveset[1].effect)
$('#heal').innerHTML = player.moveset[2].name;
$('#heal').click(player.moveset[2].effect)
$('#special').innerHTML = player.moveset[3].name;
$('#special').click(player.moveset[3].effect)

// Set enemy stats
$('#enemyName').innerHTML = enemy.name;
$('#enemyHp').innerHTML = enemy.hp;
$('#enemyMaxHp').innerHTML = enemy.maxHp;
$('#enemyHPBar').setAttribute("progress", enemy.hp);
$('#enemyHPBar').setAttribute("max", enemy.maxHp);