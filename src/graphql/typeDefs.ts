import { gql } from 'apollo-server';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    userName: String!
    createdAt: String!
    updatedAt: String!
  }

  input RegisterInput {
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;

export default typeDefs;
