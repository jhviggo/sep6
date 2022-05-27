const chai = require("chai");
const sinon = require("sinon");
const mock =  require("mock-require");
const { expect } = chai;
chai.should();

describe('User Route API', () => {
    let signUpUserMock;
    let loginMock; 
    let addUserFavoriteMock;
    let removeUserFavoriteMock;
    let getUserFavoritesMock;
    let getUserInfoMock;

    beforeEach(() => {
        signUpUserMock = sinon.stub();
        loginMock = sinon.stub();
        addUserFavoriteMock = sinon.stub();
        removeUserFavoriteMock = sinon.stub();
        getUserFavoritesMock = sinon.stub();
        addUserInfoMock = sinon.stub();
        mock('firebase/auth', {
            'createUserWithEmailAndPassword' : signUpUserMock,
            'signInWithEmailAndPassword': loginMock
        });
        getUserInfoMock = sinon.stub().returns('bob');
        getUserFavoritesMock = sinon.stub().returns('list');
        mock('../lib/repository.js', {
            'getUserInformation' : getUserInfoMock,
            'signUpUser' : signUpUserMock,
            'addUserFavorite' : addUserFavoriteMock,
            'removeUserFavorite' : removeUserFavoriteMock,
            'getUserFavorites' : getUserFavoritesMock
        });
    });

    afterEach(() => {
        signUpUserMock.resetHistory();
        loginMock.resetHistory();
    });

    it("Should Get user information by ID", async () => {
        const userMock = mock.reRequire('../routes/user.js');
        const req = {
            params: {
                id: 123
            }
        };
        const res = {
            status: () => {},
            send: sinon.stub()
        };
        await userMock.getUser(req,res);
        sinon.assert.calledWith(getUserInfoMock, 123);
        sinon.assert.calledWith(res.send,'bob');
    });

    it("Should Get user favorites by ID", async () => {
        const userMock = mock.reRequire('../routes/user.js');
        const req = {
            params: {
                id: 123
            }
        };
        const res = {
            status: () => {},
            send: sinon.stub()
        };
        await userMock.getFavorites(req,res);
        sinon.assert.calledWith(getUserFavoritesMock, 123);
        sinon.assert.calledWith(res.send,'list');
    });

    it("Should remove user favorite by ID", async () => {
        const userMock = mock.reRequire('../routes/user.js');
        const req = {
            params: {
                id: 123
            },
            body: {
                movieId: 123,
                imageUrl: 'url',
                title: 'title'
            }
        };
        const res = {
            status: () => {},
            send: sinon.stub()
        };
        await userMock.removeFavorite(req,res);
        sinon.assert.calledWith(removeUserFavoriteMock, 123, 123, 'url', 'title');
    });

    it("Should add user favorite by ID", async () => {
        const userMock = mock.reRequire('../routes/user.js');
        const req = {
            params: {
                id: 123
            },
            body: {
                movieId: 123,
                imageUrl: 'url',
                title: 'title'
            }
        }
        const res = {
            status: () => {},
            send: sinon.stub()
        };
        const movie = {
            movieId: req.body.movieId,
            imageUrl: req.body.imageUrl,
            title: req.body.title
        };
        await userMock.addFavorite(req,res);
        sinon.assert.calledWith(addUserFavoriteMock, 123, movie);
    });

    it("Should login the user via given body information", async () => {
        const userMock = mock.reRequire('../routes/user.js');
        const req = {
            body: {
                password: 123,
                email: 'email'
            }
        };
        const res = {
            status: () => {},
            send: sinon.stub()
        };
        await userMock.userLogin(req,res);
        sinon.assert.calledWith(loginMock, undefined, 'email', 123);
    });

    it("Should signup a new user via given body information", async () => {
        const userMock = mock.reRequire('../routes/user.js');
        const req = {
            body: {
                password: 123,
                email: 'email',
                userName: 'bob'
            }
        };
        const res = {
            status: () => {},
            send: sinon.stub()
        };
        await userMock.userSignup(req,res);
        sinon.assert.calledWith(signUpUserMock, undefined, 'email', 123);
    });
});

describe('Comments Route API', () => {
    let addUserCommentMock;
    let removeUserCommentMock;
    let getMovieCommentsMock;

    beforeEach(() => {
        addUserCommentMock = sinon.stub();
        removeUserCommentMock = sinon.stub();
        getMovieCommentsMock = sinon.stub().returns('list');
        mock('../lib/repository.js', {
            'getMovieComments' : getMovieCommentsMock,
            'addUserComment' : addUserCommentMock,
            'removeUserComment' : removeUserCommentMock
        });
    });

    it("Should Get list of commments by given MovieId", async () => {
        const commentMock = mock.reRequire('../routes/comments.js');
        const req = {
            params: {
                movieId: 123
            }
        };
        const res = {
            status: () => {},
            send: sinon.stub()
        };
        await commentMock.getComments(req,res);
        sinon.assert.calledWith(getMovieCommentsMock, 123);
        sinon.assert.calledWith(res.send,'list');
    })

    it("Should add commment to a given movie by MovieId", async () => {
        const commentMock = mock.reRequire('../routes/comments.js');
        const req = {
            params: {
                movieId: 123
            },
            body: {
                uid: 123,
                text: 'hello',
                userName: 'bob'
            }
        };
        const res = {
            status: () => {},
            send: sinon.stub()
        };
        const comment = {
            movieId: req.params.movieId,
            uid: req.body.userId,
            text: req.body.text,
            userName: req.body.userName,
            timestamp: new Date().toISOString(),
        };
        await commentMock.addComment(req,res);
        sinon.assert.calledWith(addUserCommentMock,comment);
    });

    it("Should remove a comment to a given movie by MovieId", async () => {
        const commentMock = mock.reRequire('../routes/comments.js');
        const req = {
            params: {
                movieId: 123,
                commentId: 123
            }
        };
        const res = {
            status: () => {},
            send: sinon.stub()
        };
        await commentMock.removeComment(req,res);
        sinon.assert.calledWith(removeUserCommentMock,123,123);
    })
})