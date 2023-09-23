/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLabware = /* GraphQL */ `
  mutation CreateLabware(
    $input: CreateLabwareInput!
    $condition: ModelLabwareConditionInput
  ) {
    createLabware(input: $input, condition: $condition) {
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
export const updateLabware = /* GraphQL */ `
  mutation UpdateLabware(
    $input: UpdateLabwareInput!
    $condition: ModelLabwareConditionInput
  ) {
    updateLabware(input: $input, condition: $condition) {
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
export const deleteLabware = /* GraphQL */ `
  mutation DeleteLabware(
    $input: DeleteLabwareInput!
    $condition: ModelLabwareConditionInput
  ) {
    deleteLabware(input: $input, condition: $condition) {
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
export const createWell = /* GraphQL */ `
  mutation CreateWell(
    $input: CreateWellInput!
    $condition: ModelWellConditionInput
  ) {
    createWell(input: $input, condition: $condition) {
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
export const updateWell = /* GraphQL */ `
  mutation UpdateWell(
    $input: UpdateWellInput!
    $condition: ModelWellConditionInput
  ) {
    updateWell(input: $input, condition: $condition) {
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
export const deleteWell = /* GraphQL */ `
  mutation DeleteWell(
    $input: DeleteWellInput!
    $condition: ModelWellConditionInput
  ) {
    deleteWell(input: $input, condition: $condition) {
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
