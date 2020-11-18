import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';

import User, { IUserDocument } from '../../models/User';

import {
  validateRegisterInput,
  validateLoginInput,
} from '../../utils/validators';

export interface IRegisterUserArgs {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Args {
  registerInput: IRegisterUserArgs;
}

const generateToken = (user: IUserDocument) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      userName: user.userName,
    },
    process.env.SECRET_KEY || '',
    {
      expiresIn: '1h',
    },
  );
};

export default {
  Mutation: {
    async login(
      parent: any,
      args: { email: string; password: string },
    ): Promise<any> {
      const { email, password } = args;
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.general = 'User does not exist';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = 'Can not login';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        id: user._id,
        token,
      };
    },
    async register(
      parent: any,
      args: Args,
      context: any,
      info: any,
    ): Promise<any> {
      const { userName, email, password, confirmPassword } = args.registerInput;

      const { errors, valid } = validateRegisterInput({
        userName,
        email,
        password,
        confirmPassword,
      });

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ email });

      if (user) {
        throw new UserInputError('User already exists', {
          errors: {
            email: 'This email is alaredy used.',
          },
        });
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords needs to be equal!');
      }

      const _password = await bcrypt.hash(password, 5);

      const newUser = new User({
        email,
        userName,
        password: _password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res,
        id: res._id,
        email: res.email,
        userName: res.userName,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
        token,
      };
    },
  },
};
