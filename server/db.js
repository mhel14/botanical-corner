const { DataStore } = require('notarealdb');
const store = new DataStore('./data');

module.exports = {
  FRUITS: store.collection('fruits'),
  VEGETABLES: store.collection('vegetables'),
  users: store.collection('users')
}