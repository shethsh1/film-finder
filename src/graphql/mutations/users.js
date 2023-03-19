import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation LoginInput($loginInput: LoginInput!) {
    login(input: $loginInput) {
      jwt
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      id
    }
  }
`;
