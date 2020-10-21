import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60*60*24*30;//30DAYS 
const SECRET = "W3 Hav3 th3 kn0w h0w";

//let authenticate = expressjwt({ secret : SECRET })
let authenticate = expressJwt({
    secret: SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
  });

let generateAccessToken = (req, res, next) => {
    req.token = req.token || {}; // req.token equals req.token or set it to an empty object
    req.token = jwt.sign({
        id: req.user.id,
    }, 
    SECRET, 
    {expiresIn: TOKENTIME //30days 
    });
    next();
}

let respond = (req, res) => {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
}

module.exports = {authenticate, generateAccessToken, respond};