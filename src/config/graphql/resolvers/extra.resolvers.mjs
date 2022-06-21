import ExtraRepository from '../../mongo/repository/ExtraRepository.mjs';

const extraRepository = new ExtraRepository();

export default {
  Query: {
    Categories: () => "Categories",
    Restrictions: () => "Restrictions",
    Badges: () => "Badges",
  },
  Mutation: {
    createBadge: (parent, { input }, ctx, info) => {
      return extraRepository.createBadge(input);
    },
    createCategory: (parent, args, ctx, info) => {
      return extraRepository.createCategory(args);
    },
  },

  Mutation: {
    createBadge: (parent, { input }, ctx, info) => {
      return extraRepository.createBadge(input);
    },
  },
};
