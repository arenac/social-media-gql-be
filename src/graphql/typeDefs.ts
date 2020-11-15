import { gql } from 'apollo-server';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

export default typeDefs;
