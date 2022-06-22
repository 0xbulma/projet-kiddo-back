import getFields from '../../../utils/getFields.mjs';

import UserRepository from '../../mongo/repository/UserRepository.mjs';

const userRepository = new UserRepository();

export default {
  Query: {
    user: (parent, { _id }, ctx, info) => {
      return userRepository.getById(_id);
    },
    users: () => {
      return userRepository.getAll();
    },
  },

  Mutation: {
    createUser: (parent, { input }, ctx, info) => {
      return userRepository.createUser(input);
    },

    modifyUser: (parent, { _id, input }, ctx, info) => {
      return userRepository.modifyUser(_id, input);
    },

    removeUser: (parent, { _id }, ctx, info) => {
      return userRepository.removeUser(_id);
    },
  },
};
