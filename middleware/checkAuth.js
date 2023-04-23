const jwt = require('jsonwebtoken');

// next allows to pass control to the next middleware or continue the request to the next middleware
const checkAuth = (req, res, next) => {
  console.log('Checking authentication');
//   if ntoken cookie (it is a jwt token) exist in the request object and is not null
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
    // if ntoken exists, it decodes the token and sets the payload  as req.user.
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    // The decoded payload can be used to authenticate the user making the request and provide access to protected routes or resources.
    req.user = decodedToken.payload;
  }

  next();
};

module.exports = checkAuth;