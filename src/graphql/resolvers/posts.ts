import Post from '../../models/Post';

export default {
  Query: {
    async getPosts() {
      try {
        console.log('POSTS');
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
