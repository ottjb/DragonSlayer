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
});

updateVariantsList();
