const { DataStore } = require('notarealdb');
const store = new DataStore('./data');

module.exports = {
  fruits: store.collection('fruits'),
  vegetables: store.collection('vegetables'),
  users: store.collection('users')
}