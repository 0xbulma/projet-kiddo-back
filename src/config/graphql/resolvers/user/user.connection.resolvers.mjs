import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { getUserTokenByCookies } from '../../../../utils/constant.mjs';
import UserRepository from '../../../mongo/repository/UserRepository.mjs';
const userRepository = new UserRepository();

export const USER_CONNECTION = async (parent, { email, password }, { req, res }) => {
  const user = await userRepository.getByEmail(email);
  if (user == null) {
    // Utilitaire de suppression de Cookie si l'utilisateur n'existe pas/plus
    const reqToken = getUserTokenByCookies(req);
    if (reqToken) {
      const cookie_options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        maxAge: 1,
      };
      res.cookie('authorization', 'Bearer ' + token, cookie_options);
    }
    return new GraphQLError('Utiliateur introuvable !');
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const cookie_options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        maxAge: 1000 * 60 * 60 * 24 * 7, //Store for 7 days
      };
      const token = jwt.sign({ _id: user._id, email }, process.env.JWT_TOKEN_SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7 });
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

export const DISCONNECT_USER = async (parent, { _id }, { req, res }) => {
  const user = await userRepository.getById(_id);
  if (user == null) return new GraphQLError('Utiliateur introuvable !');

  const token = getUserTokenByCookies(req);
  if (token == null) return new GraphQLError("Token de l'utilisateur introuvable !");
  const cookie_options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'PROD',
    maxAge: 1,
  };
  res.cookie('authorization', 'Bearer ' + token, cookie_options);
  return user;
};
