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
        return `
        <main>
            <div class="inner">
                <div class="main-container">
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
                    <h2 class="title menu-count">총 0개의 메뉴</h2>
                    <ul class="menu-list">
                    <div class="loading"></div>
                    </ul>
                </div>
            </div>
        </main>`;
    }
}
