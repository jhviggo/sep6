//DUMMY DATA FOR RESPONSE:
const response = {
    userName: 'bob',
    password: 'bob',
    email: 'bob@gmail.com'
};


async function getUser(req, res){
    const userId = req.params.id;
    response.userName = userId;
    res.send(response);
}

async function getFavorites(req, res){
    const userId = req.params.id;
    const favorites = [
        1234,
        5345
      ]
    const userFavorites = {
        userId: userId,
        favorites: favorites
    };
    res.send(userFavorites);
}

async function userLogin(req, res){
    const userName = req.body.userName; 
    const password = req.body.password;
    res.send(response);
}

async function userSignup(req, res){
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    res.send(response);
}

async function addFavorite(req, res){
    const favorites = req.body.favorites;
    const userId = req.params.id;
    const userFavorites = {
        userId: userId,
        favorites: favorites
    };
    res.send(userFavorites);
}

export{
    getUser,
    getFavorites,
    userLogin,
    userSignup,
    addFavorite
};