import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("로그인");
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
                    <a href="/logout" data-link><button class="logout blur btn">🔌 로그아웃</button></a>
                </nav>
            </div>
        </div> 
    </header>
    <main>
        <div class="inner">
            <div class="main-container">
                <h2 class="title">로그인</h2>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">LOADING...</div>
            </div>
        </div>
    </main>`;
  }
}
