import { getFirestore, doc, setDoc, updateDoc, arrayUnion} from "firebase/firestore";
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

async function addUserFavorite(uid, movie){
    const userRef = doc(db,'users',uid);
    await updateDoc(userRef,{favorites: arrayUnion(movie)});
}

export{
    signUpUser,
    addUserFavorite,
    initializeDB
};
