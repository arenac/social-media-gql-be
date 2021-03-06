import { gql } from 'apollo-server';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
    updatedAt: String!
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
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;

export default typeDefs;
