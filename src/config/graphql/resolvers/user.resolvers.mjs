import UserRepository from '../../mongo/repository/UserRepository.mjs';

import * as constants from '../../../utils/constant.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();

export default {
  Query: {
    user: (parent, { _id }) => userRepository.getById(_id),
    users: () => userRepository.getAll(),
  },

  Mutation: {
    createUser: (parent, { input }, ctx, info) => userRepository.createUser(input, ctx.req.res),
    modifyUser: (parent, { _id, input }) => userRepository.modifyUser(_id, input),
    removeUser: (parent, { _id }) => userRepository.removeUser(_id),

    //Recover password system
    recoverPassword: async (parent, { email }, ctx) => {
      const resetPasswordToken = { token: constants.GENERATE_UUID, created_at: Date.now() };

      const user = await userRepository.getByEmail(email);
      if (user === null) return Error('User not found!');

      const modifiedUser = await userRepository.modifyUser(user._id, { reset_password_token: resetPasswordToken });
      //Envoi d'un mail avec lien de récupération
      return modifiedUser;
    },

    resetPassword: async (parent, { _id, email, token, password }) => {
      const user = await userRepository.getById(_id);
      if (user === null) return Error('User not found!');

      if (user.reset_password_token.token === token && user.email === email) {
        const tokenCreatedAt = new Date(user.reset_password_token.created_at).getTime();
        const tokenValidity = Date.now() - tokenCreatedAt;

        if (tokenValidity > constants.TOKEN_VALIDITY_TIME) {
          user.reset_password_token = null;
          return Error('Token invalide !');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        user.password = hash;
        user.reset_password_token = [];

        const modifiedUser = await userRepository.modifyUser(_id, user);
        return modifiedUser;
      } else {
        return Error('Token incorrecte !');
      }
    },
  },
};

//front > target_id, sender_id
//continueIfModo(_id, context)
//authUtils.isModo ? continue >
