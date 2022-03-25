import AbstractView from "./AbstractView.js";
import { authService } from "../utils/firebase.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("랜덤 선택");
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
                    <h2 class="user-name"></h2>
                    <nav class="nav-container">
                        <a href="/random" data-link><button class="random btn">🎲 랜덤 선택</button></a>
                        <a href="/manage" data-link><button class="manage btn">💻 메뉴 관리</button></a>
                        <a href="/login" data-link><button class="login btn">🔑 로그인</button></a>
                        <a href="/logout" data-link><button class="logout blur btn">🔌 로그아웃</button></a>
                    </nav>

                    <nav class="nav-container">
                        <button class="start btn">START</button>
                        <button class="stop btn" disabled>STOP</button>
                    </nav>
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
