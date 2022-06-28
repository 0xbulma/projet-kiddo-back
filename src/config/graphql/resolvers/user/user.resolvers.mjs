import UserRepository from '../../../mongo/repository/UserRepository.mjs';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as friendResolver from './user.friend.resolvers.mjs';
import * as passwordResolver from './user.password.resolvers.mjs';
import userModel from '../../../mongo/models/user.model.mjs';

const userRepository = new UserRepository();

export default {
  Query: {
    getUserById: (parent, { _id }) => userRepository.getById(_id),
    getUserByEmail: (parent, { email }) => userRepository.getByEmail(email),
    users: () => userRepository.getAll(),
  },

  Mutation: {
    createUser: async (parent, { input }, ctx, info) => {
      let token = jwt.sign(input, process.env.JWT_TOKEN_SECRET);
      let email = input.email;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(input.password, salt);

      const cookie_options = {
        httpOnly: true,
      };
      ctx.res.cookie('authorization', 'Bearer ' + token, cookie_options);

      const user = await userModel.create({ token: token, email: email, password: hash });
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
