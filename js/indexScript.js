$(document).ready(function () {
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);

  $("#login").submit(function (e) {
    e.preventDefault();

    var email = $("#emailLogin").val();
    var password = $("#passwordLogin").val();
    console.log(email);
    console.log(password);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        // Signed in
        // ...
        console.log("login in");
        let user = firebase.auth().currentUser;
        const db = firebase.firestore();
        var userRef = db.collection("DragonSlayerUsers").doc(user.displayName);
        userRef
          .get()
          .then((querySnapshot) => {
            userData = querySnapshot.data().userData;
            console.log(userData);
          })
          .then(function () {
            if (userData.character.class != "") {
              window.location.href = "map.html?currentUser=" + user.displayName;
            } else {
              window.location.href =
                "characterCreation.html?currentUser=" + user.displayName;
            }
          });
        //user.updateProfile({ displayName: "Not sure" });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  });

  $("#signup").submit(function (e) {
    e.preventDefault();

    var username = $("#usernameSignup").val();
    var email = $("#emailSignup").val();
    var password = $("#passwordSignup").val();
    var confirmPassword = $("#confirmPasswordSignup").val();

    console.log(username, email);
    console.log(password, confirmPassword);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((success) => {
        // Signed in
        // ...
        console.log("signup in");
        let user = firebase.auth().currentUser;

        user.updateProfile({ displayName: username });

        var userinfo = {
          userData: {
            accountStats: {
              attempts: 0,
              victories: 0,
              enemiesSlain: 0,
            },
            character: {
              name: username,
              class: "",
              maxHP: 0,
              currentHP: 0,
              attack: 0,
              defense: 0,
              speed: 0,
              dodge: 0,
              bonusAttack: 0,
              bonusDefense: 0,
              bonusSpeed: 0,
              bonusDodge: 0,
              sprite: { front: "", back: "" },
            },
            gameState: {
              map: [],
              positionOnMap: 0,
              currentEnemy: 0,
            },
            pets: {
              acquiredPets: [],
              equippedPet: "",
            },
          },
        };

        var db = firebase.firestore();
        db.collection("DragonSlayerUsers")
          .doc(userinfo.userData.character.name)
          .set(userinfo)
          .then(function () {
            alert(
              `Welcome, ${userinfo.userData.character.name}! Please login to continue.`
            );
            window.location.href = "index.html";
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  });
});
