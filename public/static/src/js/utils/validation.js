import { authService } from "./firebase.js";

const isLogin = () => {
    authService.onAuthStateChanged((user) => {
        if(user){
            document.querySelector(".login").style.display = "none";
            document.querySelector(".logout").style.display = "block";
        }
        else {
            document.querySelector(".login").style.display = "block";
            document.querySelector(".logout").style.display = "none";
            if(location.pathname !== "/login") {
                window.location.href = "/login";
            }
            
        }
    });
}

const isNull = (storeName, menuName) => {
    if(storeName=="" || menuName=="") {
        alert("빈값이 있습니다!");
        return true;
    }
    else false;
}


export {isLogin, isNull};
