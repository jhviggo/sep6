/**
 * Sample route for some endpoint
 *
 * @param {object} req the request send to the server
 * @param {object} res the response we return
 * @returns {object[]} list of movies
 */
function getMovies(req, res) {
  res.send([{'id': 1234, 'data': 'I am now in the cloud'}])
}

module.exports = {
  getMovies
};
