const jwt = require('jsonwebtoken');
const axios = require('axios');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { signUpUser, addUserFavorite, removeUserFavorite, getUserFavorites, getUserInformation, initializeDB } = require('../lib/repository.js');

const ISS = 'https://securetoken.google.com/sep6-6733b';

let auth;
let firestorePublicKeys;

async function initializeUser(app) {
    auth = getAuth(app);
    initializeDB(app);
    const response = await axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
    firestorePublicKeys = response.data;
}

function verifyIdToken(idToken) {
    const header64 = idToken.split('.')[0];
    const header = JSON.parse(Buffer.from(header64, 'base64').toString('ascii'));
    return jwt.verify(idToken, firestorePublicKeys[header.kid], { algorithms: ['RS256'] });
};

async function verifyUserMiddleware(req, res, next) {
    const uid = req.params.id || req.body?.userId;
    let token;
    try {
        token = verifyIdToken(req.headers.authorization.split(' ')[1]);
    } catch (tokenError) {
        res.status(401).send('Invalid token');
        return;
    }

    if (token.sub !== uid) {
        res.status(401).send('Invalid uid');
        return;
    }

    if (token.iss !== ISS) {
        res.status(401).send('Invalid issuer');
        return;
    }
    next();
}

async function getUser(req, res){
    const userId = req.params.id;
    try{
        const userToReturn = await getUserInformation(userId);
        res.send(userToReturn);
    } catch (error) {
        res.status(400)
        res.send(error.message);
    }
}

async function userLogin(req, res){
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
        res.send(error.message);
    }
}

async function userSignup(req, res){
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;

    try {
        const firebaseRep = await createUserWithEmailAndPassword(auth, email, password);
        const response = {
            uid: firebaseRep.user.uid,
            accessToken: firebaseRep.user.accessToken,
            expirationTime: firebaseRep.user.stsTokenManager.expirationTime
        };
        signUpUser(firebaseRep.user, userName)
        res.send(response);
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

async function addFavorite(req, res){
    const uid = req.params.id;
    const movie = {
        movieId: req.body.movieId,
        imageUrl: req.body.imageUrl,
        title: req.body.title
    };
    try{
        await addUserFavorite(uid,movie);
        const response = {
            uid: uid,
            movieId: movie.movieId
        };
        res.send(response);
    }catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

async function removeFavorite(req,res){
    const uid = req.params.id;
    const movieId = req.body.movieId;
    const imageUrl = req.body.imageUrl;
    const title = req.body.title;
    try{
        await removeUserFavorite(uid,movieId,imageUrl, title);
        const response = {
            uid: uid,
            movieId: movieId,
            imageUrl: imageUrl,
        };
        res.send(response);
    }catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

async function getFavorites(req, res){
    const uid = req.params.id;
    try{
        const data = await getUserFavorites(uid);
        res.send(data);
    }catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

module.exports = {
    initializeUser,
    getUser,
    getFavorites,
    userLogin,
    userSignup,
    addFavorite,
    removeFavorite,
    verifyUserMiddleware,
};
