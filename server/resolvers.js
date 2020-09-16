const db = require('./db');

const Query = {
  // Fruits
  fruit: (root, args) => db.fruits.get(args.id),
  fruits: () => db.fruits.list(),
  // Vegies
  vegetable: (root, args) => db.vegetables.get(args.id),
  vegetables: () => db.vegetables.list(),
  // vegetables: () => data.vegetables
}

const Mutation = {
  // Fruits
  addFruit: (root, args) => {
    const fruitId = db.fruits.create({name: args.name});
    return db.fruits.get(fruitId)
  },
  updateFruit: (root, {id, name}) => {
    db.fruits.update({ id, name })
    return db.fruits.get(id)
  },
  deleteFruit: (_, {id}) => {
    db.fruits.delete(id)
    return db.fruits.list()
  },
  // Vegies
  addVegetable: (root, args) => {
    const vegetableId = db.vegetables.create({name: args.name});
    return db.vegetables.get(vegetableId)
  },
  updateVegetable: (root, {id, name}) => {
    db.vegetables.update({ id, name })
    return db.vegetables.get(id)
  },
  deleteVegetable: (_, {id}) => {
    db.vegetables.delete(id)
    return db.vegetables.list()
  }
}

module.exports = { Query, Mutation };