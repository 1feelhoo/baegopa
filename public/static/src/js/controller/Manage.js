import { $ } from "../utils/dom.js";
import { isLogin, isNull } from "../utils/validation.js";
import { authService, dbService } from "../utils/firebase.js";
import { dbWrite, dbUpdate, dbRemove } from "../utils/db.js";



export default function Manage() {
    this.init = () => {
        isLogin();
        rendering();
    };
    const rendering = () => {
        authService.onAuthStateChanged((user) => {
            if(user){
                const dataList = [];
                const userID = user.uid;
                dbService.collection(userID).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        dataList.push({"id": doc.id, "data": doc.data()});
                    });

                    const template = dataList.map((items) => {
                        return `
                        <li data-item-id="${items.id}" class="menu-item">
                            <span class="menu-item-name">${items.data.store} - ${items.data.menu}</span>
                            <button class="button item-update" >수정</button>
                            <button class="button item-remove" >삭제</button>
                        </li>`; 
                    }).join("");
                    
                    $(".menu-list").innerHTML = template;
                    updateCount();
                });
            }
            else {
                console.log("no USER");
            }
        });   
    }

    const updateCount = () => {
        const menuCount = document.querySelectorAll(".menu-item").length;
        $(".menu-count").innerText = `총 ${menuCount}개의 메뉴`;
    };

    const addMenuName = () => {
        console.log(isNull($("#store-name").value, $("#menu-name").value));
        if (isNull($("#store-name").value, $("#menu-name").value)) return;
        console.log("Manage.js addItem");
        const storeName = $("#store-name").value;
        const menuName = $("#menu-name").value;
        dbWrite(storeName, menuName);

        $("#store-name").value = "";
        $("#menu-name").value = "";

        rendering();
    };

    const updatedItem = (e) => {
        const storeName = e.target
        .closest("li")
        .querySelector(".menu-item-name")
        .innerText.split("-")[0]
        .trim();
        const menuName = e.target
        .closest("li")
        .querySelector(".menu-item-name")
        .innerText.split("-")[1]
        .trim();
        const itemId = e.target.closest("li").dataset.itemId;
        const updatedStoreName = prompt("가게 이름 입력 ", storeName);
        const updatedMenuName = prompt("메뉴 이름 입력 ", menuName);

        if (!isNull(updatedStoreName, updatedMenuName)) {
            dbUpdate(itemId, updatedStoreName, updatedMenuName);
            rendering();
        }
    };

    const removeItem = (e) => {
        const isRemove = confirm("정말 삭제 하시겠습니까?");
        if (!isRemove) {
            return;
        }

        dbRemove(e);
        rendering();
    };

    $("#menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $(".menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("item-update")) {
            updatedItem(e);
        }

        if (e.target.classList.contains("item-remove")) {
            removeItem(e);
        }
    });

    $("#store-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
        return;
        }
        e.preventDefault();
        $("#menu-name").focus();
    });

    $("#menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
        return;
        }
        e.preventDefault();
        addMenuName();
    });

    $("#input-submit").addEventListener("click", (e) => {
        addMenuName();
        console.log("input btn click");
    });
}
