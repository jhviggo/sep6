const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const { getUser, getFavorites, userLogin, userSignup, addFavorite, removeFavorite, initializeUser, verifyUserMiddleware } = require('./routes/user.js');
const { getComments, addComment, removeComment } = require('./routes/comments.js');
const morgan = require('morgan');
const cors = require('cors');
const { initializeApp } = require('firebase/app');

//Instatiation of API components
async function initialize(){
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
  await initializeUser(firebaseApp);
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
app.get('/user/:id', verifyUserMiddleware, getUser);
app.get('/user/:id/favorite', verifyUserMiddleware, getFavorites);
app.post('/login', jsonParser, userLogin);
app.post('/signup', jsonParser, userSignup);
app.post('/user/:id/favorite', jsonParser, verifyUserMiddleware, addFavorite);
app.delete('/user/:id/favorite', jsonParser, verifyUserMiddleware, removeFavorite);
//Comment routes
app.get('/comments/:movieId', getComments);
app.post('/comments/:movieId', jsonParser, verifyUserMiddleware, addComment);
app.post('/comments/:movieId/:commentId', jsonParser, verifyUserMiddleware, removeComment);

//Instatiate 
initialize().then(() => {
  // Listen
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
