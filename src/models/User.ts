import { Document, model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    userName: String,
    password: String,
    email: String,
  },
  { timestamps: true },
);

export interface User {
  userName: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDocument extends User, Document {}

export default model<UserDocument>('User', UserSchema);
