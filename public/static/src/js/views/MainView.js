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
                console.log("Main.js | no USER");
            }
        });   
        
    }

    async getHtml() {
        return `
        <main>
            <div class="inner">
                <div class="main-container">
                    <nav class="nav-container">
                        <button class="start btn">START</button>
                        <button class="stop btn" disabled>STOP</button>
                    </nav>
                    <h2 class="title menu-count">총 0개의 메뉴</h2>
                    
                    <ul class="menu-list">
                        <div class="loading"></div>
                    </ul>
                </div>
            </div>
        </main>`;
    }
}
