import { UserInputError } from 'apollo-server';

import Post, { PostsDocument } from '../../models/Post';
import checkAuth from '../../utils/checkAuth';

export default {
  Query: {
    async getPosts(): Promise<PostsDocument[] | void> {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(
      _parent: unknown,
      { postId }: unknown,
      _context: unknown,
      _info: unknown,
    ): Promise<PostsDocument | void> {
      try {
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
    async createPost(
      _parent: unknown,
      { body }: unknown,
      context: unknown,
      _info: unknown,
    ): Promise<PostsDocument> {
      const user = checkAuth(context);

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

    async deletePost(
      _parent: unknown,
      { postId }: unknown,
      context: unknown,
      _info: unknown,
    ): Promise<void | string> {
      const user = checkAuth(context);

      try {
        const response = await Post.findById(postId);
        const post = response as PostsDocument;

        if (user.id === String(post.user)) {
          await post.deleteOne();
          return 'Post deleted successfully';
        }
        throw new UserInputError('Action not allowed');
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
