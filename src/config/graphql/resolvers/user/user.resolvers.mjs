import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { getUserByCookieToken } from '../../../../utils/authUtils.mjs';

import UserRepository from '../../../mongo/repository/UserRepository.mjs';

import * as friendResolver from './user.friend.resolvers.mjs';
import * as passwordResolver from './user.password.resolvers.mjs';
import * as connectionResolver from './user.connection.resolvers.mjs';
import userModel from '../../../mongo/models/user.model.mjs';

const userRepository = new UserRepository();

export default {
  Query: {
    getUserById: (parent, { _id }) => userRepository.getById(_id),
    getUserByEmail: (parent, { email }, { res, req }) => userRepository.getByEmail(email),
    users: () => userRepository.getAll(),
    connectUser: connectionResolver.USER_CONNECTION,
    checkToken: async (parent, args, ctx, info) => {
      const result = getUserByCookieToken(ctx.req);
      if (!result) {
        return { _id: null, email: null, isConnected: false };
      }
      if (result) {
        const user = await userRepository.getById(result);
        return { _id: user._id, email: user.email, isConnected: true };
      }
    },
  },

  Mutation: {
    createUser: async (parent, { input }, { res }, info) => {
      let email = input.email;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(input.password, salt);

      const user = await userModel.create({ email: email, password: hash });

      const token = jwt.sign({ _id: user._id, email }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 7,
      });
      const cookie_options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        maxAge: 1000 * 60 * 60 * 24 * 7, //Store for 7 days
      };
      res.cookie('authorization', 'Bearer ' + token, cookie_options);

      return user;
    },
    modifyUser: (parent, { _id, input }) => userRepository.modifyUser(_id, input),
    removeUser: (parent, { _id }) => userRepository.removeUser(_id),

    // Password system
    recoverPassword: passwordResolver.RECOVER_PASSWORD,
    resetPassword: passwordResolver.RESET_PASSWORD,

    // Friend system
    sendFriendRequest: friendResolver.SEND_FRIEND_REQUEST_SECTION,
  },
};
