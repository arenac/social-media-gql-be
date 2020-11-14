// import '@config/env';
import * as dotenv from 'dotenv';

import { ApolloServer, gql } from 'apollo-server';
import mongose from 'mongoose';

dotenv.config();

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => 'Hello World!!!',
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
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`🚀 Server running at ${res.url}`);
  });
