import { authService,dbService } from "./firebase.js";

// db 쓰기 함수
const dbWrite = (storeName, menuName) => {
    
    authService.onAuthStateChanged((user) => {
        if(user){
            const userID = user.uid;
            dbService
                .collection(userID)
                .add({
                    store: storeName,
                    menu: menuName,
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
        else {
            console.log("no USER");
        }
    });
    
};

// db 업데이트 함수
const dbUpdate = (itemId, storeName, menuName) => {
    console.log("db Update!");
    authService.onAuthStateChanged((user) => {
        if(user){
            const userId = user.uid;
            dbService.collection(userId).doc(itemId).update({
                store: storeName,
                menu: menuName,
            });
        } else {
            console.log("no user");
        }
    });
};

// db 삭제 함수
const dbRemove = (e) => {
    const itemId = e.target.closest("li").dataset.itemId;

    authService.onAuthStateChanged((user) => {
        if(user){
            const userId = user.uid;
            dbService
                .collection(userId)
                .doc(itemId)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted! => ", itemId);
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        } else {
            console.log("no user");
        }
    });
    
};

export {dbWrite, dbUpdate, dbRemove}
