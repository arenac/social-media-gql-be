import { IRegisterUserArgs } from '../graphql/resolvers/users';

interface IErrorsObject {
  [key: string]: any;
}

export interface IValidateRegisterInputReturn extends IErrorsObject {
  valid: boolean;
}

export const validateRegisterInput = ({
  userName,
  email,
  password,
  confirmPassword,
}: IRegisterUserArgs): IValidateRegisterInputReturn => {
  const errors: IErrorsObject = {};

  if (userName.trim() === '') {
    errors.userName = 'User name must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
