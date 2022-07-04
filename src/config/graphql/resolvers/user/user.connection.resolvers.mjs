import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';

import UserRepository from '../../../mongo/repository/UserRepository.mjs';
const userRepository = new UserRepository();

export const USER_CONNECTION = async (parent, { email, password }, { res }) => {
  const user = await userRepository.getByEmail(email);
  if (user == null) return new GraphQLError('Utiliateur introuvable !');

  try {
    if (await bcrypt.compare(password, user.password)) {
      const cookie_options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        maxAge: 1000 * 60 * 60 * 24 * 7, //Store for 7 days
      };
      res.cookie('authorization', 'Bearer ' + user.token, cookie_options);

      return user;
    } else {
      return new GraphQLError('Mot de passe incorrecte !');
    }
  } catch (e) {
    return new GraphQLError(e);
  }
};
