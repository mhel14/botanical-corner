const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../constants');

module.exports = (req, _, next) => {
  const cookieToken = req.cookies["access-token"];
  if(!cookieToken) {
    req.isAuth = false;
    return next();
  }
  if(!cookieToken || cookieToken === '') {
    req.isAuth = false;
    return next();
  }
  let validToken;
  try {
    validToken = jwt.verify(cookieToken, SECRET_KEY)
  } catch(err) {
    req.isAuth = false;
    return next();
  }

  if(!validToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = validToken.userId;
  req.role = validToken.role;
  next();
}