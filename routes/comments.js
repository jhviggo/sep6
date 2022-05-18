//DUMMY DATA FOR RESPONSE:
const response = {

};

async function getComments(req,res){
    const id = req.params.moveId;
    const response = {
        movieId: id,
        userName: 'bob',
        text: 'Bob liky',
        timestamp: '18-05-2022'
    };
    res.send(response);
}

async function addComment(req,res){
    const id = req.params.moveId;
    const user = req.body.userId;
    const userText = req.body.text;
    const response = {
        userId: user,
        text: userText,
        movieId: id
    };
    res.send(response);
}

export{
    getComments,
    addComment
};