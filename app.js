import express from 'express';
import { getMovies } from './routes/movies.js';

const app = express();
const PORT = 8080;

// Routes
app.get('/', getMovies);

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
