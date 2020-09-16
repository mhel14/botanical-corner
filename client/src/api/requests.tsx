const url = 'http://localhost:5000/graphql';

export const getFruits = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `{
        fruits{
          id
          name
        }
      }`
    })
  });

  const responseBody = await response.json();
  return responseBody.data.fruits;
}

export const getFruit = async (id: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `query fruitQuery($id: ID!) {
        fruit(id: $id){
          id
          name
        }
      }`,
      variables: { id }
    })
  });

  const responseBody = await response.json();
  return responseBody.data.fruit;
}

export const addFruit = async (name: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      mutation addFruit($name: String!) {
        addFruit(name: $name){
          id
          name
        }
      }`,
      variables: { name }
    })
  });

  const responseBody = await response.json();
  return responseBody.data.fruit;
}

export const updateFruit = async (id: string, name: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      mutation updateFruit($id: ID!, $name: String!) {
        updateFruit(id: $id, name: $name){
          id
          name
        }
      }`,
      variables: { id, name }
    })
  });

  const responseBody = await response.json();
  return responseBody.data;
}

export const deleteFruit = async (id: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      mutation deleteFruit($id: ID!) {
        deleteFruit(id: $id){
          id
          name
        }
      }`,
      variables: { id }
    })
  });

  const responseBody = await response.json();
  return responseBody.data;
}

// Vegetables
export const getVegetables = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `{
        vegetables{
          id
          name
        }
      }`
    })
  });

  const responseBody = await response.json();
  return responseBody.data.vegetables;
}

export const getVegetable = async (id: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `query vegetableQuery($id: ID!) {
        vegetable(id: $id){
          id
          name
        }
      }`,
      variables: { id }
    })
  });

  const responseBody = await response.json();
  return responseBody.data.vegetable;
}

export const addVegetable = async (name: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      mutation addVegetable($name: String!) {
        addVegetable(name: $name){
          id
          name
        }
      }`,
      variables: { name }
    })
  });

  const responseBody = await response.json();
  return responseBody.data.vegetable;
}

export const updateVegetable = async (id: string, name: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      mutation updateVegetable($id: ID!, $name: String!) {
        updateVegetable(id: $id, name: $name){
          id
          name
        }
      }`,
      variables: { id, name }
    })
  });

  const responseBody = await response.json();
  return responseBody.data.vegetable;
}

export const deleteVegetable = async (id: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      mutation deleteVegetable($id: ID!) {
        deleteVegetable(id: $id){
          id
          name
        }
      }`,
      variables: { id }
    })
  });

  const responseBody = await response.json();
  return responseBody.data;
}