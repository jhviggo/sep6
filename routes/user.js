import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

let app;
let auth;

function initialize() {
    const projectId = 'sep6-6733b';
    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: `${projectId}.firebaseapp.com`,
        projectId,
        storageBucket: `${projectId}.appspot.com`,
        messagingSenderId: "681323377586",
        appId: process.env.APP_ID,
        databaseURL: `https://${projectId}.eur3.firebasedatabase.app`,
    }
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
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
    signInWithEmailAndPassword(auth, email, password)
    .then((userCridential) => {
        //Signed in
        const user = userCridential.user;
        res.send(user);
    })
    .catch((error) => {
        const errorCode = error.code; 
        const errorMessage = error.message; 
        console.log("Error Code: ", errorCode);
        console.log("Error Message: ", errorMessage);
        res.send(errorMessage);
      });
}

async function userSignup(req, res){
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;

    //Creating a user with email and password
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCridential) => {
        //Signed in 
        const user = userCridential.user; 
        res.send(user);
    })
    .catch((error) => {
        const errorCode = error.code; 
        const errorMessage = error.message; 
        console.log("Error Code: ", errorCode);
        console.log("Error Message: ", errorMessage);
        res.send(errorMessage);
    })
}

async function addFavorite(req, res){
    const favorites = req.body.favorites;
    const userId = req.params.id;
    const userFavorites = {
        userId: userId,
        favorites: favorites
    };
    res.send(userFavorites);
}

export{
    initialize,
    getUser,
    getFavorites,
    userLogin,
    userSignup,
    addFavorite
};