# botanical-corner

- Install dependencies for client and server
- Run both after all dependencies are installed
- Ports: client: 3000, server: 5000, graphql/apollo playground: http://localhost:5000/graphql
- To do a test on apollo playground, query all the fruits or vegetables and from the list select the id you want to mutate or just add new one
```
query {
  fruits {
    id
    name
  }
}
```
```
query {
  vegetables {
    id
    name
  }
}
```
- List of mutations
```
  addFruit(name: String!): Fruit
  updateFruit(id: ID!, name: String!): Fruit
  deleteFruit(id: ID!): [Fruit]

  addVegetable(name: String!): Vegetable
  updateVegetable(id: ID!, name: String!): Vegetable
  deleteVegetable(id: ID!): [Vegetable]
```

## Client
- Login credentials Username/Password:
````
admin/admin
john/john
marry/marry
````

