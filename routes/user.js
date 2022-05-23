import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signUpUser, addUserFavorite, initializeDB } from '../lib/repository.js'

let auth;
function initializeUser(app) {
    auth = getAuth(app);
    initializeDB(app);
}

//DUMMY DATA FOR RESPONSE:
const response = {
    userName: 'bob',
    password: 'bob',
    email: 'bob@gmail.com'
};


async function getUser(req, res){
    const userId = req.params.id;
    response.userName = userId;
    res.send(response);
}

async function getFavorites(req, res){
    const userId = req.params.id;
    const favorites = [
        1234,
        5345
      ]
    const userFavorites = {
        userId: userId,
        favorites: favorites
    };
    res.send(userFavorites);
}

async function userLogin(req, res){
    const userName = req.body.userName; 
    const password = req.body.password;
    const email = req.body.email; 
    try {
        const firebaseRep = await signInWithEmailAndPassword(auth, email, password);
        const response = {
            uid: firebaseRep.user.uid,
            accessToken: firebaseRep.user.accessToken,
            expirationTime: firebaseRep.user.stsTokenManager.expirationTime
        };
        res.send(response);
    } catch (error) {
        res.status(400)
        res.send(errorMessage);
    }
}

async function userSignup(req, res){
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;

    try {
        const firebaseRep = await createUserWithEmailAndPassword(auth, email, password);
        const response = {
            accessToken: firebaseRep.user.accessToken,
            expirationTime: firebaseRep.user.stsTokenManager.expirationTime
        };
        signUpUser(firebaseRep.user, userName)
        res.send(response);
    } catch (error) {
        res.status(400);
        res.send(errorMessage);
    }
}

async function addFavorite(req, res){
    const uid = req.params.id;
    const movie = {
        movieId: req.body.movieId,
        imageUrl: req.body.imageUrl
    };
    try{
        await addUserFavorite(uid,movie);
        const response = {
            uid: uid,
            movieId: movie.movieId,
            status: 'added'
        };
        res.send(response);
    }catch (error) {
        res.status(400);
        res.send(errorMessage);
    }
}

export{
    initializeUser,
    getUser,
    getFavorites,
    userLogin,
    userSignup,
    addFavorite
};