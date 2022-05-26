const { addUserComment, getMovieComments } = require('../lib/repository.js');

async function getComments(req,res){
    const movieId = req.params.movieId;
    try{
        const response = await getMovieComments(movieId);
        res.send(response);
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

async function addComment(req,res){
    const comment = {
        movieId: req.params.movieId,
        uid: req.body.userId,
        text: req.body.text,
        userName: req.body.userName,
        timestamp: new Date().toISOString(),
    };
    try{
        const response = await addUserComment(comment);
        res.send(response);
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

module.exports = {
    getComments,
    addComment
};