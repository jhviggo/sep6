import { getFirestore, doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc} from "firebase/firestore";
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

async function removeUserFavorite(uid, movieId, imageUrl){
    const userRef = doc(db,'users',uid);
    const movieToDelete = {
        movieId: movieId,
        imageUrl, imageUrl
    };
    await updateDoc(userRef,{favorites: arrayRemove(movieToDelete)});
}

async function getUserFavorites(uid){
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    return userDoc.data().favorites;
}

export{
    signUpUser,
    addUserFavorite,
    removeUserFavorite,
    getUserFavorites,
    initializeDB
};
