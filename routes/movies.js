import firestore from '../lib/repository.js'
/**
 * Sample route for some endpoint
 *
 * @param {object} req the request send to the server
 * @param {object} res the response we return
 * @returns {object[]} list of movies
 */
async function getMovies(req, res) {
  res.send(await firestore.getMovies());
}

export {
  getMovies
};
