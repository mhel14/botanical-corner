const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const resolvers = require('./resolvers');
const cookieParser = require('cookie-parser');
const isAuth = require('./middleware/isAuth');

const app = express();
app.use(cookieParser());
const jwtSecret = Buffer.from('Zn4Q5tyZ/G1MHlsc4F/gTrVJMlrbKiZt', 'base64');
const PORT = 5000;

app.use(isAuth)

app.use(cors(), bodyParser.json(), expressJwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
  credentialsRequired: false
}));

const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding: 'utf8'}));

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: ({req, res}) => ({req, res}) });
apolloServer.applyMiddleware({app, path: '/graphql'});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  const user = db.users.list().find((user) => user.username === username);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token, role: user.role, scope: user.scope});
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
})