import { gql } from "apollo-server";

export const schema = gql`
  type User {
    email: String!
    
  }
`;
