import { $ } from "../utils/dom.js";
import { authService, dbService } from "../utils/firebase.js";
import { isLogin } from "../utils/validation.js";

const sleep = (ms) => {
    return new Promise((r) => setTimeout(r, ms));
};

export default function Random() {
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
                            <li class="menu-item">
                                <span style="text-align:center;" class="menu-item-name">${items.data.store} - ${items.data.menu}</span>
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

    sleep(1000).then(() => {
        const itemList = document.querySelectorAll(".menu-item");
        console.log("Random.js 49line", itemList);
        let y, w; // setTimeout clear용 변수
        console.log("start setTimeout | itemList length => ", itemList.length);
        const w2y = (i) => {
        if (i < itemList.length) {
            itemList[i++].style.backgroundColor = "#fcffa8";
            y = setTimeout(w2y, 200, i);
        } else {
            clearTimeout(y);
            w = setTimeout(y2w, 200, 0);
        }
        };

        const y2w = (i) => {
        if (i < itemList.length) {
            itemList[i++].style.backgroundColor = "#fff";
            w = setTimeout(y2w, 200, i);
        } else {
            clearTimeout(w);
            y = setTimeout(w2y, 200, 0);
        }
        };

        $(".start").addEventListener("click", () => {
        itemList.forEach((item) => {
            item.style.backgroundColor = "#fff";
        });
        console.log(!$(".start").disabled);
        if (!$(".start").disabled) {
            y = setTimeout(w2y, 200, 0);
        }

        $(".stop").disabled = false;
        $(".start").disabled = true;
        });

        $(".stop").addEventListener("click", () => {
        console.log("stop!!!");
        clearTimeout(y);
        clearTimeout(w);

        sleep(100).then(() => {
            // 랜덤으로 나온 메뉴 빼고 배경색 초기화
            itemList.forEach((item) => {
            item.style.backgroundColor = "#fff";
            });

            // 메뉴 랜덤으로 선정
            let idx = parseInt(Math.random() * itemList.length);

            itemList[idx].style.backgroundColor = "#f7684f";
        });

        $(".stop").disabled = true;
        $(".start").disabled = false;
        });
    });
    }
