import postsResolvers from './posts';
import usersResolvers from './users';

export default {
  Query: {
    ...postsResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};
