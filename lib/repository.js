import { getFirestore, doc, setDoc} from "firebase/firestore";
let db;

function initializeDB(app) {
    db = getFirestore(app);
}

async function signUpUser(user, userName){
    const userToAdd = {
        uid: user.uid,
        email: user.email, 
        userName: userName,
        favorites: new Array()
    };
    await setDoc(doc(db, "users", user.uid), userToAdd);
}

export{
    signUpUser,
    initializeDB
};
