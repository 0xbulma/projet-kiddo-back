import UserRepository from '../../mongo/repository/UserRepository.mjs';

const userRepository = new UserRepository();

export default {
  Query: {
    Users: () => 'Users',
  },

  Mutation: {
    createUser: (parent, { input }, ctx, info) => {
      const createdUser = userRepository.createUser(input);
      return createdUser;
    },
  },
};
