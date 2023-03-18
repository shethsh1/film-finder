import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LoginInput($loginInput: LoginInput!) {
    login(input: $loginInput) {
      jwt
    }
  }
`;
