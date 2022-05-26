import chai, { expect } from "chai";
import sinon from "sinon";
import mock from "mock-require";

chai.should();

describe('User Route API', () => {
    let getAuthMock;
    let createUserMock;
    let signInMock; 
    let getUserInfoMock;

    beforeEach(() => {
        getAuthMock = sinon.stub();
        createUserMock = sinon.stub();
        signInMock = sinon.stub();
        mock('firebase/auth', {
            'getAuth' : getAuthMock,
            'createUserWithEmailAndPassword' : createUserMock,
            'signInWithEmailAndPassword': signInMock
        });
        mock('../lib/repository.js', {
            'getUserInformation' : getUserInfoMock
        });
    });

    afterEach(() => {
        getAuthMock.resetHistory();
        createUserMock.resetHistory();
        signInMock.resetHistory();
    });

    it("Should Get user information by ID", async () => {
        const userMock = mock.reRequire('./routes/user.js');
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
        expect(getUserInfoMock).to.have.been.called;
    });

    /**
     * Post: Signup User
     */

    /**
     * Post: Login User 
     */

    /**
     * Get: Favorites from User 
     */

    /**
     * Post: Add Favorite from user
     */

    /**
     * Del: Remove Favorite from user 
     */
});