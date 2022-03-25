import AbstractView from "./AbstractView.js";
import { authService } from "../utils/firebase.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("메뉴 관리");
        authService.onAuthStateChanged((user) => {
            if(user){
                if(user.displayName)
                    this.setUserName(user.displayName);
                else
                    this.setUserName(user.email);
            }
            else {
                console.log("no USER");
            }
        }); 
    }
    async getHtml() {
        return `<header>
            <div class="inner">
                <div class="head-container">
                <a href="/" data-link><h1 class="title">🍜 메뉴 좀 골라죠 🍕</h1></a>
                    <nav class="nav-container">
                        <a href="/random" data-link><button class="random btn">🎲 랜덤 선택</button></a>
                        <a href="/manage" data-link><button class="manage btn">💻 메뉴 관리</button></a>
                        <a href="/login" data-link><button class="login btn">🔑 로그인</button></a>
                        <a href="/logout" data-link><button class="logout display-none btn">🔌 로그아웃</button></a>
                    </nav>
                    <form id="menu-form">
                        <h2 class="title user-name"></h2>
                        <h2 class="title">💻 메뉴 관리 💻</h2>
                        <div class="menu-form">
                            <label for="store-name" class="input-label" hidden>
                                가게 이름
                            </label>
                            <input cLass="input-feild" id="store-name" type="text" placeholder="가게 이름">
                            <label for="menu-name" class="input-label" hidden>
                                메뉴 이름
                            </label>
                            <input class="input-feild" id="menu-name" type="text" placeholder="메뉴 이름">
                            <button id="input-submit">추가하기</button>
                        </div>
                    </form>
                </div>
            </div> 
        </header>
        <main>
            <div class="inner">
                <div class="main-container">
                    <h2 class="title menu-count">총 0개의 메뉴</h2>
                    <ul class="menu-list">
                    <div class="loading"></div>
                    </ul>
                </div>
            </div>
        </main>`;
    }
}
