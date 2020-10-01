# botanical-corner

- Port: server: 5000, graphql/apollo playground: http://localhost:5000/graphql
```
query {
  listItems(category: enum.CATEGORY!) {
    id
    name
  }
}
```
```
query {
  item(id: ID!, category: enum.CATEGORY!) {
    id
    name
  }
}
```
- List of mutations
```
  addItem(name: String!, category: enum.CATEGORY!!): Item
  updateItem(id: ID!, name: String!, category: enum.CATEGORY!!): Item
  deleteItem(id: ID!, category: enum.CATEGORY!!): [Item]
```

## Client
- Login credentials Username/Password:
````
admin/admin
john/john
marry/marry
````

