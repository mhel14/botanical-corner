const {
  querySingleItem,
  queryListItem,
  addItem,
  updateItem,
  deleteItem,
  login
} = require('./helpers');

const Query = {
  item: querySingleItem,
  listItems: queryListItem,
  login
};

const Mutation = {
  addItem,
  updateItem,
  deleteItem
};

module.exports = { Query, Mutation };
