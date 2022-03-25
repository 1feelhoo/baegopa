import MainView from "./views/MainView.js";
import ManageView from "./views/ManageView.js";
import LoginView from "./views/LoginView.js";
import LogoutView from "./views/LogoutView.js";
import Manage from "./controller/Manage.js";
import Random from "./controller/Random.js";
import Login from "./controller/Login.js"

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: MainView },
        { path: "/random", view: MainView },
        { path: "/manage", view: ManageView },
        { path: "/login", view: LoginView },
        { path: "/logout", view: LogoutView }
    ];

    const potentialMatches = routes.map((route) => {
        return {
        route: route,
        isMatch: location.pathname === route.path,
        };
    });

    let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true,
        };
    }

    const view = new match.route.view();

    if (match.route.path === "/manage") {
        setTimeout(() => {
            const app = new Manage();
            app.init();
        }, 5);
    } else if(match.route.path === "/" || match.route.path === "/random"){
        setTimeout(() => {
            const app = new Random();
            app.init();
        }, 5);
    } else {
        setTimeout(() => {
            const app = new Login();
            app.init();
        }, 5);
    }

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});
