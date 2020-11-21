import Post from '../../models/Post';
import checkAuth from '../../utils/checkAuth';

export default {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(parent: any, args: any, context: any, info: any) {
      try {
        console.log(args);
        const { postId } = args;
        const post = await Post.findById(postId);

        if (post) {
          return post;
        }
        throw new Error('Post not found');
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(parent: any, { body }: any, context: any, info: any) {
      const user = checkAuth(context);

      console.log(user);

      const { id, userName } = user;

      const newPost = new Post({
        body,
        user: id,
        userName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
  },
};
