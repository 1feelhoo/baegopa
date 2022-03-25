import {authService} from "../utils/firebase.js"
import {$} from "../utils/dom.js"


// Initialize the FirebaseUI Widget using Firebase.

export default function Login() {
    this.init = () => {
        isLogin();
    };
    
    const isLogin = () => {
        console.log("check login");
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if(user){
                console.log(document.querySelector(".logout"));
                document.querySelector(".login").style.display = "none";
                document.querySelector(".logout").style.display = "block";
            }
            else {
                document.querySelector(".login").style.display = "block";
                document.querySelector(".logout").style.display = "none";
            }
        });
    }

    const ui = new firebaseui.auth.AuthUI(authService);

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                return true;
            },
            uiShown: function() {
                document.getElementById('loader').style.display = 'none';
            }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/random',
            signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            ]
        };

    // The start method will wait until the DOM is loaded.
    
    authService.onAuthStateChanged((user) => {
        if(user){
            $(".logout-btn").addEventListener("click", () => {
                authService.signOut();
            });
        }
        else {
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    });
}
