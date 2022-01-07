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
            location.replace("/relatorio.html");
        }else{
            init();
        }
    });
    function init(){
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
    
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    if (authResult.additionalUserInfo.isNewUser) {
                        authResult.user.sendEmailVerification();
                    }
                    return true;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: 'relatorio.html',
            signInOptions: [
                {
                // Leave the lines as is for the providers you want to offer your users.
                    provider: firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                }
            ],
            credentialHelper: firebaseui.auth.CredentialHelper.NONE,
            tosUrl: '',        
            privacyPolicyUrl: function() {
                window.location.assign('');
            }
        };
    
        ui.start('#firebaseui-auth-container', uiConfig);
    }
})();