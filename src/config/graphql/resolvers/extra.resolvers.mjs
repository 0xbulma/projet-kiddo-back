import ExtraRepository from "../../mongo/repository/ExtraRepository.mjs";

const extraRepository = new ExtraRepository();

export default {
  Query: {
    Categories: () => "Categories",
    Restrictions: () => "Restrictions",
    Badges: () => "Badges",
  },
  Mutation: {
    // badges
    createBadge: (parent, { input }, ctx, info) => {
      return extraRepository.createBadge(input);
    },
    modifyBadge: (parent, { _id, input }, ctx, info) => {
      return extraRepository.modifyBadge(_id, input);
    },
    removeBadge: (parent, args, ctx, info) => {
      return extraRepository.removeBadge(args._id);
    },
    // category
    createCategory: (parent, args, ctx, info) => {
      return extraRepository.createCategory(args.name);
    },
    modifyCategory: (parent, { _id, name }, ctx, info) => {
      return extraRepository.modifyCategory(_id, name);
    },
    removeCategory: (parent, args, ctx, info) => {
      return extraRepository.removeCategory(args._id);
    },
    // restriction
    createRestriction: (parent, args, ctx, info) => {
      return extraRepository.createRestriction(args.name);
    },
    modifyRestriction: (parent, { _id, name }, ctx, info) => {
      return extraRepository.modifyRestriction(_id, name);
    },
    removeRestriction: (parent, args, ctx, info) => {
      return extraRepository.removeRestriction(args._id);
    },
  },
};
