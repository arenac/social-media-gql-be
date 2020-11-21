/* eslint-disable import/first */
// import '@config/env';
import * as dotenv from 'dotenv';

dotenv.config();

import { ApolloServer } from 'apollo-server';
import mongose from 'mongoose';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
  }),
});

mongose
  .connect(process.env.MONGODB_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('⭐ Connected to the DB!');
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`🚀 Server running at ${res.url}`);
  });
