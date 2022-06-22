import UserRepository from '../../mongo/repository/UserRepository.mjs';

const userRepository = new UserRepository();

export default {
  Query: {
    user: (parent, { _id }) => userRepository.getById(_id),
    users: () => userRepository.getAll(),
  },

  Mutation: {
    createUser: (parent, { input }) => userRepository.createUser(input),
    modifyUser: (parent, { _id, input }) => userRepository.modifyUser(_id, input),
    removeUser: (parent, { _id }) => userRepository.removeUser(_id),
  },
};
