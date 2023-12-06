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

        //user.updateProfile({ displayName: "Not sure" });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  });

  // DO NOT TEST YET
  $("#signup").submit(function (e) {
    e.preventDefault();

    var name = $("#usernameSignup").val();
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

        user.updateProfile({ displayName: name });
        firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            name: name,
            email: email,
            phone: phone,
            address: address,
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  });
});
