const db = require('./db');
const jwt = require('jsonwebtoken');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, ROLES } = require('./constants');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const isUserAuthenticated = (req) => {
  if (!req.isAuth) {
    throw new AuthenticationError('Unauthenticated');
  }
};

const isUserAuthorized = (req, category) => {
  return req.role === ROLES.admin || req.scope === category;
};

const querySingleItem = (_, args, { req }) => {
  isUserAuthenticated(req);
  if(req.role === ROLES.admin) {
    return db[args.category].get(args.id);
  }
  return db[req.scope].get(args.id);
}

const queryListItem = (_, args, { req }) => {
  isUserAuthenticated(req);
  if(req.role === ROLES.admin) {
    return db[args.category].list();
  }
  return db[req.scope].list();
}

const addItem = (_, {name, category}, { req }) => {
  isUserAuthenticated(req);
  if (isUserAuthorized(req, category)) {
    const itemId = db[category].create({ name });
    return db[category].get(itemId);
  } else {
    throw new ForbiddenError('Access role is forbidden');
  }
}

const updateItem = (_, { id, name, category }, { req }) => {
  isUserAuthenticated(req);
  if (isUserAuthorized(req, category)) {
    db[category].update({ id, name });
    return db[category].get(id);
  } else {
    throw new ForbiddenError('Access role is forbidden');
  }
}

const deleteItem = (_, { id, category }, { req }) => {
  isUserAuthenticated(req);
  if (isUserAuthorized(req, category)) {
    db[category].delete(id);
    return db[category].list();
  } else {
    throw new ForbiddenError('Access role is forbidden');
  }
}

const login = (_, { username, password }, { res }) => {
  const user = db.users.list().find((user) => user.username === username);
  if (!user) {
    throw new AuthenticationError('Invalid credentials');
  }
  if (!(user && user.password === password)) {
    // res.sendStatus(401);
    throw new AuthenticationError('Invalid credentials');
  }
  const refreshToken = jwt.sign({ userId: user.id, username: user.username, role: user.role, scope: user.scope }, REFRESH_SECRET_KEY, {
    expiresIn: '1d'
  });
  const accesToken = jwt.sign({ userId: user.id, username: user.username, role: user.role, scope: user.scope }, ACCESS_SECRET_KEY, {
    expiresIn: '5min'
  });

  res.cookie('refresh-token', refreshToken, { maxAge: 2 * 60 * 60 * 1000 });
  res.cookie('access-token', accesToken);
  return { accesToken, userId: user.id, role: user.role, scope: user.scope };
}

module.exports = {
  querySingleItem,
	queryListItem,
	addItem,
	updateItem,
	deleteItem,
	login
}