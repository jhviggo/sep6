import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import { getUser, getFavorites, userLogin, userSignup, addFavorite, initialize } from './routes/user.js';
import { getComments, addComment } from './routes/comments.js';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 8080;
//Middleware to pass json body types in request
const jsonParser = bodyParser.json();
//Morgan token for use and custom tokens
morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('id', (req) => req.params.id);
morgan.token('movieId', (req) => req.params.movieId);
app.use(morgan(':url :method :status'));

// Routes
//User routes
app.get('/user/:id', morgan(':id'),getUser);
app.get('/user/:id/favorite', morgan(':id') ,getFavorites);
app.post('/login', morgan(':body'),jsonParser,userLogin);
app.post('/signup', morgan(':body'),jsonParser,userSignup);
app.post('/user/:id/favorite', morgan(':id :body'),jsonParser,addFavorite);
//Comment routes
app.get('/comments/:movieId', morgan(':movieId'),getComments);
app.post('/comments/:movieId', morgan(':movieId :body'),jsonParser,addComment);

initialize();
// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
