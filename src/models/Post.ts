import { model, Schema, Document } from 'mongoose';

const PostsSchema = new Schema(
  {
    body: String,
    userName: String,
    comments: [
      {
        body: String,
        userName: String,
        createAt: String,
      },
    ],
    likes: [
      {
        userName: String,
        createdAt: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
);

interface Comment {
  body: string;
  userName: string;
  createdAt: string;
}

interface Like {
  userName: string;
  createdAt: string;
}

interface User {
  type: Schema.Types.ObjectId;
  ref: string;
}
export interface Posts {
  body: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  likes: Like[];
  user: User;
}

export interface PostsDocument extends Posts, Document {}

export default model<PostsDocument>('Post', PostsSchema);
