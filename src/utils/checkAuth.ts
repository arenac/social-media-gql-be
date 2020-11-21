import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

interface User {
  id: string;
  userName: string;
}

export default (context: any): User => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY || '') as User;
        return user;
      } catch (err) {
        throw new AuthenticationError('Ivanlid token');
      }
    }
    throw new Error('Auth token must be "Bearer [token]"');
  }
  throw new Error('Authorization header must be provided');
};
