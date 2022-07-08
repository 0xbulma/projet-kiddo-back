import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import UserRepository from '../../../mongo/repository/UserRepository.mjs';
const userRepository = new UserRepository();

export const USER_CONNECTION = async (parent, { email, password }, { req, res }) => {
  const user = await userRepository.getByEmail(email);
  if (user == null) return new GraphQLError('Utiliateur introuvable !');
  console.log('user connection')
  try {
    if (await bcrypt.compare(password, user.password)) {
      const cookie_options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        maxAge: 1000 * 60 * 60 * 24 * 7, //Store for 7 days
      };
      const token = jwt.sign({ _id: user._id, email }, process.env.JWT_TOKEN_SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7 });
      console.log(token);
      res.cookie('authorization', 'Bearer ' + token, cookie_options);
      return user;
    } else {
      return new GraphQLError('Mot de passe incorrecte !');
    }
  } catch (e) {
    console.log('error', e);
    return new GraphQLError(e);
  }
};
