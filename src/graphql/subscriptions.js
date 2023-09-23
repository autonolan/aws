/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLabware = /* GraphQL */ `
  subscription OnCreateLabware($filter: ModelSubscriptionLabwareFilterInput) {
    onCreateLabware(filter: $filter) {
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
export const onUpdateLabware = /* GraphQL */ `
  subscription OnUpdateLabware($filter: ModelSubscriptionLabwareFilterInput) {
    onUpdateLabware(filter: $filter) {
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
export const onDeleteLabware = /* GraphQL */ `
  subscription OnDeleteLabware($filter: ModelSubscriptionLabwareFilterInput) {
    onDeleteLabware(filter: $filter) {
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
export const onCreateWell = /* GraphQL */ `
  subscription OnCreateWell($filter: ModelSubscriptionWellFilterInput) {
    onCreateWell(filter: $filter) {
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
export const onUpdateWell = /* GraphQL */ `
  subscription OnUpdateWell($filter: ModelSubscriptionWellFilterInput) {
    onUpdateWell(filter: $filter) {
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
export const onDeleteWell = /* GraphQL */ `
  subscription OnDeleteWell($filter: ModelSubscriptionWellFilterInput) {
    onDeleteWell(filter: $filter) {
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
