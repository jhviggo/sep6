import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import { getUser, getFavorites, userLogin, userSignup, addFavorite, initializeUser } from './routes/user.js';
import { getComments, addComment } from './routes/comments.js';
import morgan from 'morgan';
import cors from 'cors';
import { initializeApp } from 'firebase/app';

//Instatiation of API components
function initialize(){
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
  const firebaseApp = initializeApp(firebaseConfig);
  initializeUser(firebaseApp);
}

const app = express();
const PORT = process.env.PORT || 8080;
//Middleware to pass json body types in request
const jsonParser = bodyParser.json();
//Morgan token for use and custom tokens
morgan.token('id', (req) => req.params.id);
morgan.token('movieId', (req) => req.params.movieId);
app.use(morgan(' Url: :url \n Method: :method \n Status: :status \n ResponseTime: :response-time ms \n ID: :id \n MovieID: :movieId'));
app.use(cors());

// Routes
//User routes
app.get('/user/:id',getUser);
app.get('/user/:id/favorite',getFavorites);
app.post('/login',jsonParser,userLogin);
app.post('/signup',jsonParser,userSignup);
app.post('/user/:id/favorite',jsonParser,addFavorite);
//Comment routes
app.get('/comments/:movieId',getComments);
app.post('/comments/:movieId',jsonParser,addComment);

//Instatiate 
initialize();

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
