const jwt = require('jsonwebtoken');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require('../constants');

module.exports = (req, _, next) => {
  const accessToken = req.cookies["access-token"];
  const refreshToken = req.cookies["refresh-token"];

  if(!accessToken) {
    req.isAuth = false;
    return next();
  }

  if(!refreshToken) {
    req.isAuth = false;
    return next();
  }

  if(!accessToken && !refreshToken) {
    req.isAuth = false;
    return next();
  }

  if(!accessToken || accessToken === '') {
    req.isAuth = false;
    return next();
  }
  let validToken;
  try {
    validToken = jwt.verify(accessToken, ACCESS_SECRET_KEY)
  } catch(err) {
    req.isAuth = false;
    return next();
  }

  try {
    validToken = jwt.verify(refreshToken, REFRESH_SECRET_KEY)
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
  req.scope = validToken.scope;
  next();
}