const db = require('./db');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, ROLES } = require('./constants');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const isUserAuthenticated = (req) => {
	if (!req.isAuth) {
		throw new AuthenticationError('Unauthenticated');
  }
};

const isFruitsAdmin = (req) => {
	return req.role === ROLES.admin || req.role === ROLES.FruitJohn
};

const isVegestablesAdmin = (req) => {
	return req.role === ROLES.admin || req.role === ROLES.VegetarianMary
};

const Query = {
	// Fruits
	fruit: (_, args, { req }) => {
		isUserAuthenticated(req);
    return db.fruits.get(args.id)
	},
	fruits: (_, args, { req }) => {
		isUserAuthenticated(req);
    return db.fruits.list()
	},
	// Vegies
	vegetable: (_, args, { req }) => {
		isUserAuthenticated(req);
    return db.vegetables.get(args.id)
	},
	vegetables: (_, args, { req }) => {
		isUserAuthenticated(req);
    return db.vegetables.list()
	},
	login: (_, { username, password }, { res }) => {
		const user = db.users.list().find((user) => user.username === username);
		if (!user) {
			throw new AuthenticationError('Invalid credentials');
		}
		if (!(user && user.password === password)) {
			// res.sendStatus(401);
			throw new AuthenticationError('Invalid credentials');
		}
		const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, SECRET_KEY, {
			expiresIn: '5min'
		});

		res.cookie('access-token', token);
		return { token, userId: user.id, role: user.role };
	}
};

const Mutation = {
	// Fruits
	addFruit: (_, args, { req }) => {
    isUserAuthenticated(req);
    if (isFruitsAdmin(req)) {
      const fruitId = db.fruits.create({name: args.name});
      return db.fruits.get(fruitId)
    } else {
      throw new ForbiddenError('Access role is forbidden');
    }
	},
	updateFruit: (_, { id, name }, { req }) => {
    isUserAuthenticated(req);
    if (isFruitsAdmin(req)) {
      db.fruits.update({ id, name })
      return db.fruits.get(id)
    } else {
      throw new ForbiddenError('Access role is forbidden');
    }
	},
	deleteFruit: (_, { id }, { req }) => {
    isUserAuthenticated(req);
    if (isFruitsAdmin(req)) {
      db.fruits.delete(id)
      return db.fruits.list()
    } else {
      throw new ForbiddenError('Access role is forbidden');
    }
	},
	// Vegies
	addVegetable: (_, args, {req}) => {
    isUserAuthenticated(req);
		if(isVegestablesAdmin(req)) {
      const vegetableId = db.vegetables.create({ name: args.name });
      return db.vegetables.get(vegetableId);
		} else {
		  throw new ForbiddenError('Access role is forbidden')
		}
	},
	updateVegetable: (root, { id, name }, {req}) => {
    isUserAuthenticated(req);
		if(isVegestablesAdmin(req)) {
      db.vegetables.update({ id, name });
      return db.vegetables.get(id);
		} else {
		  throw new ForbiddenError('Access role is forbidden')
		}
	},
	deleteVegetable: (_, { id }, {req}) => {
    isUserAuthenticated(req);
		if(isVegestablesAdmin(req)) {
      db.vegetables.delete(id);
      return db.vegetables.list();
		} else {
		  throw new ForbiddenError('Access role is forbidden')
		}
		
	}
};

module.exports = { Query, Mutation };
