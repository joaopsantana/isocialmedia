(function () {
    var config = {
      apiKey: "AIzaSyAkITzXDFEPXzd3Va4utA2SgR-FQedRgZE",
      authDomain: "socialmediaapp-8e78e.firebaseapp.com",
      databaseURL: "https://socialmediaapp-8e78e-default-rtdb.firebaseio.com",
      projectId: "socialmediaapp-8e78e",
      storageBucket: "socialmediaapp-8e78e.appspot.com",
      messagingSenderId: "244623482053",
      appId: "1:244623482053:web:7a3508fcc2d7f1787ce4ac"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      } else {
        location.replace("/index.html");
      }
    });
    var desconectar = document.getElementById("desconectar");
    desconectar.addEventListener("click", () => {
      firebase.auth().signOut().then(function() {
      }).catch(function(error) {
      });
    });
})();