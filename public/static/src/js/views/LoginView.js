import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("로그인");
  }

  async getHtml() {
    return `<main>
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
