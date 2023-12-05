var classMap = [
  {
    id: 1,
    name: "Fighter",
    description:
      "A strong warrior who can take a lot of damage and deal a lot of damage.",
  },
  {
    id: 2,
    name: "Rogue",
    description:
      "A sneaky thief who can deal a lot of damage and avoid a lot of damage.",
  },
  {
    id: 3,
    name: "Wizard",
    description:
      "A powerful mage who can deal a lot of damage and heal a lot of damage.",
  },
  {
    id: 4,
    name: "Ranger",
    description:
      "A skilled archer who can deal a lot of damage and avoid a lot of damage.",
  },
];

var variants = [
  { id: 1, variants: ["Default", "Black", "Red", "Gold"] },
  { id: 2, variants: ["Default", "Blue", "Purple", "Red"] },
  { id: 3, variants: ["Default", "Black", "Blue", "Purple"] },
  { id: 4, variants: ["Default", "Blue", "Purple", "White"] },
];

var fighterTemplate = {
  name: "",
  class: "Fighter",
  sprite: {
    front: "img/fighter/front/base.png",
    back: "img/fighter/back/base.png",
  },
  maxHP: 100,
  currentHP: 100,
  attack: 12,
  defense: 10,
  speed: 8,
  dodge: 5,
  bonusAttack: 0,
  bonusDefense: 0,
  bonusSpeed: 0,
  bonusDodge: 0,
};

var rogueTemplate = {
  name: "",
  class: "Rogue",
  sprite: {
    front: "img/rogue/noVariant/front/base.png",
    back: "img/rogue/noVariant/back/base.png",
  },
  maxHP: 80,
  currentHP: 80,
  attack: 9,
  defense: 8,
  speed: 12,
  dodge: 15,
  bonusAttack: 0,
  bonusDefense: 0,
  bonusSpeed: 0,
  bonusDodge: 0,
};

var wizardTemplate = {
  name: "",
  class: "Wizard",
  sprite: {
    front: "img/wizard/noVariant/front/base.png",
    back: "img/wizard/noVariant/back/base.png",
  },
  maxHP: 70,
  currentHP: 70,
  attack: 15,
  defense: 6,
  speed: 10,
  dodge: 10,
  bonusAttack: 0,
  bonusDefense: 0,
  bonusSpeed: 0,
  bonusDodge: 0,
};

var rangerTemplate = {
  name: "",
  class: "Ranger",
  sprite: {
    front: "img/ranger/front/base.png",
    back: "img/ranger/back/base.png",
  },
  maxHP: 90,
  currentHP: 90,
  attack: 11,
  defense: 9,
  speed: 10,
  dodge: 12,
  bonusAttack: 0,
  bonusDefense: 0,
  bonusSpeed: 0,
  bonusDodge: 0,
};

classMap.forEach((item) => {
  $("#class").append(`<option value="${item.id}">${item.name}</option>`);
});

function updateVariantsList() {
  $("#variant").empty();
  var currentClass = $("#class").val();
  console.log(currentClass);
  var currentVariants = variants.find(
    (item) => item.id == currentClass
  ).variants;
  console.log(currentVariants);
  currentVariants.forEach((item) => {
    console.log(currentVariants.indexOf(item));
    $("#variant").append(
      `<option value="${currentVariants.indexOf(item) + 1}">${item}</option>`
    );
  });
}

$("#classLeft").click(function () {
  console.log("left");
  var current = parseInt($("#class").val());
  var next = current - 1;
  if (next < 1) {
    next = 4;
  }
  $("#class").val(next);
  updateVariantsList();
  updateImage();
  updateStats();
  updateDescription();
});

$("#classRight").click(function () {
  console.log("right");
  var current = parseInt($("#class").val());
  var next = current + 1;
  console.log(next);
  if (next > 4) {
    next = 1;
  }
  $("#class").val(next);
  updateVariantsList();
  updateImage();
  updateStats();
  updateDescription();
});

$("#variantLeft").click(function () {
  console.log("left");
  var current = parseInt($("#variant").val());
  console.log(current);
  var next = current - 1;
  if (next < 1) {
    next = 4;
  }
  console.log(next);
  $("#variant").val(next);
  updateImage();
});

$("#variantRight").click(function () {
  console.log("Right");
  var current = parseInt($("#variant").val());
  console.log(current);
  var next = current + 1;
  if (next > 4) {
    next = 1;
  }
  console.log(next);
  $("#variant").val(next);
  updateImage();
});

var variantPaths = {
  11: {
    front: "img/fighter/front/base.png",
    back: "img/fighter/back/base.png",
  },
  12: {
    front: "img/fighter/front/black.png",
    back: "img/fighter/back/black.png",
  },
  13: {
    front: "img/fighter/front/red.png",
    back: "img/fighter/back/red.png",
  },
  14: {
    front: "img/fighter/front/gold.png",
    back: "img/fighter/back/gold.png",
  },
  21: {
    front: "img/rogue/noVariant/front/base.png",
    back: "img/rogue/noVariant/back/base.png",
  },
  22: {
    front: "img/rogue/noVariant/front/blue.png",
    back: "img/rogue/noVariant/back/blue.png",
  },
  23: {
    front: "img/rogue/noVariant/front/purple.png",
    back: "img/rogue/noVariant/back/purple.png",
  },
  24: {
    front: "img/rogue/noVariant/front/red.png",
    back: "img/rogue/noVariant/back/red.png",
  },
  31: {
    front: "img/wizard/noVariant/front/base.png",
    back: "img/wizard/noVariant/back/base.png",
  },
  32: {
    front: "img/wizard/noVariant/front/black.png",
    back: "img/wizard/noVariant/back/black.png",
  },
  33: {
    front: "img/wizard/noVariant/front/blue.png",
    back: "img/wizard/noVariant/back/blue.png",
  },
  34: {
    front: "img/wizard/noVariant/front/purple.png",
    back: "img/wizard/noVariant/back/purple.png",
  },
  41: {
    front: "img/ranger/front/base.png",
    back: "img/ranger/back/base.png",
  },
  42: {
    front: "img/ranger/front/blue.png",
    back: "img/ranger/back/blue.png",
  },
  43: {
    front: "img/ranger/front/purple.png",
    back: "img/ranger/back/purple.png",
  },
  44: {
    front: "img/ranger/front/white.png",
    back: "img/ranger/back/white.png",
  },
};

function updateImage() {
  var currentClass = $("#class").val();
  var currentVariant = $("#variant").val();
  var currentPath = variantPaths[`${currentClass}${currentVariant}`];
  console.log(currentPath);
  switch (currentClass) {
    case "1":
      $("#name").text("The Fighter");
      break;
    case "2":
      $("#name").text("The Rogue");
      break;
    case "3":
      $("#name").text("The Wizard");
      break;
    case "4":
      $("#name").text("The Ranger");
      break;
  }

  $("#charImg").attr("src", currentPath.front);
}

function updateDescription() {
  var currentClass = $("#class").val();
  var currentDescription = classMap.find(
    (item) => item.id == currentClass
  ).description;
  console.log(currentDescription);
  $("#description").text(currentDescription);
}

function updateStats() {
  var currentSelectedClass = $("#class").val();
  switch (currentSelectedClass) {
    case "1":
      var currentTemplate = fighterTemplate;
      break;
    case "2":
      var currentTemplate = rogueTemplate;
      break;
    case "3":
      var currentTemplate = wizardTemplate;
      break;
    case "4":
      var currentTemplate = rangerTemplate;
      break;
  }
  $("#hp").text(currentTemplate.maxHP);
  $("#atk").text(currentTemplate.attack);
  $("#def").text(currentTemplate.defense);
  $("#spd").text(currentTemplate.speed);
  $("#dge").text(currentTemplate.dodge);
}

updateVariantsList();
updateImage();
updateStats();
updateDescription();
