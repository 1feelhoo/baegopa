import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("로그아웃");
  }

  async getHtml() {
    return `
    <main>
        <div class="inner">
            <div class="main-container">
                <h2 class="title">로그아웃</h2>
                <div id="firebaseui-auth-container"></div>
                <button class="logout-btn btn" id="loader">💻 로그아웃</button>
            </div>
        </div>
    </main>`;
  }
}
