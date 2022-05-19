import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import { getUser, getFavorites, userLogin, userSignup, addFavorite, initialize } from './routes/user.js';
import { getComments, addComment } from './routes/comments.js';

const app = express();
const PORT = process.env.PORT || 8080;
//Middleware to pass json body types in request
const jsonParser = bodyParser.json();

// Routes
//User routes
app.get('/user/:id',getUser);
app.get('/user/:id/favorite',getFavorites);
app.post('/login',jsonParser,userLogin);
app.post('/signup',jsonParser,userSignup);
app.post('/user/:id/favorite',jsonParser,addFavorite);
//Comment routes
app.get('/comments/:moveId',getComments);
app.post('/comments/:moveId',jsonParser,addComment);

initialize();
// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
