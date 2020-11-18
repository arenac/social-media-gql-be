import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';

import User from '../../models/User';

import { validateRegisterInput } from '../../utils/validators';

export interface IRegisterUserArgs {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Args {
  registerInput: IRegisterUserArgs;
}

export default {
  Mutation: {
    async register(
      parent: any,
      args: Args,
      context: any,
      info: any,
    ): Promise<any> {
      console.log(info);
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

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          userName: res.userName,
        },
        process.env.SECRET_KEY || '',
        {
          expiresIn: '1h',
        },
      );

      return {
        ...res,
        id: res._id,
        email: res.email,
        userName: res.userName,
        password: res.password,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
        token,
      };
    },
  },
};
