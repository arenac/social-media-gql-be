/* eslint-disable import/first */
// import '@config/env';
import * as dotenv from 'dotenv';

dotenv.config();

import { ApolloServer, gql } from 'apollo-server';
import mongose from 'mongoose';

import Post from './models/Post';

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
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongose
  .connect(process.env.MONGODB_URI || '', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('⭐ Connected to the DB!');
  });
server.listen({ port: 5000 }).then(res => {
  console.log(`🚀 Server running at ${res.url}`);
});
