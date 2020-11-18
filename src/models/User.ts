import { Document, model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    userName: String,
    password: String,
    email: String,
  },
  { timestamps: true },
);

export interface IUser {
  userName: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserDocument extends IUser, Document {}

export default model<IUserDocument>('User', UserSchema);
