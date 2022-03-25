export default class {
    constructor() {

    }

    setTitle(title) {
        document.title = title;
    }

    setUserName(name) {
        document.querySelector(".user-name").innerText = `${name} 님의 리스트`
    }

    async getHtml() {
        return "";
    }
}
