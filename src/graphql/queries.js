/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLabware = /* GraphQL */ `
  query GetLabware($id: ID!) {
    getLabware(id: $id) {
      id
      name
      well_shape
      well_dim
      row_count
      col_count
      well_vol
      well_bottom
      well_bottom_dim
      well_height
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLabwares = /* GraphQL */ `
  query ListLabwares(
    $filter: ModelLabwareFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabwares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        well_shape
        well_dim
        row_count
        col_count
        well_vol
        well_bottom
        well_bottom_dim
        well_height
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWell = /* GraphQL */ `
  query GetWell($id: ID!) {
    getWell(id: $id) {
      id
      name
      volume
      liquid_level
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listWells = /* GraphQL */ `
  query ListWells(
    $filter: ModelWellFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWells(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        volume
        liquid_level
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
