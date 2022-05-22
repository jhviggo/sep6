import jwt from 'jsonwebtoken';
import axios from 'axios';

const response = await axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
const publicKeys = response.data;

const verifyIdToken = idToken => {
    const header64 = idToken.spilt('.')[0];
    const header = JSON.parse(Buffer.from(header64, 'base64').toString('ascii'));
    return jwt.verify(idToken, publicKeys[header.kid], {algorithms: ['RS256']});
}

export{
    verifyIdToken
};