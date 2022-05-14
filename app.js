const express = require('express');
const { getMovies } = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 8080;

// Routes
app.get('/', getMovies);


// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
