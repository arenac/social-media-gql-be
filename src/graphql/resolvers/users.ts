import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../models/User';

export default {
  Mutation: {
    async register(
      parent: any,
      args: any,
      context: any,
      info: any,
    ): Promise<any> {
      /**
       * TODO:
       * -Validate user data
       * - Make sure user does not alredy exist
       * - Hash password and create an auth token
       */

      const {
        userName,
        email,
        password,
        confirmPassword,
      } = args?.registerInput;

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
