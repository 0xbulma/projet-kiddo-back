import ExtraRepository from '../../mongo/repository/ExtraRepository.mjs';

const extraRepository = new ExtraRepository();

export default {
  Query: {
    Categories: () => 'Categories',
    Restrictions: () => 'Restrictions',
    Badges: () => 'Badges',
    Signalments: () => 'Signalments',
    Reactions: () => 'Reactions',
  },

  Mutation: {
    //========
    // Badge
    //========
    createBadge: (parent, { input }, ctx, info) => extraRepository.createBadge(input),
    modifyBadge: (parent, { _id, input }, ctx, info) => extraRepository.modifyBadge(_id, input),
    removeBadge: (parent, args, ctx, info) => extraRepository.removeBadge(args._id),

    //===========
    // Categorie
    //===========
    createCategory: (parent, args, ctx, info) => extraRepository.createCategory(args.name),
    modifyCategory: (parent, { _id, name }, ctx, info) => extraRepository.modifyCategory(_id, name),
    removeCategory: (parent, args, ctx, info) => extraRepository.removeCategory(args._id),

    //=============
    // Restriction
    //=============
    createRestriction: (parent, args, ctx, info) => extraRepository.createRestriction(args.name),
    modifyRestriction: (parent, { _id, name }, ctx, info) => extraRepository.modifyRestriction(_id, name),
    removeRestriction: (parent, args, ctx, info) => extraRepository.removeRestriction(args._id),

    //=============
    // Signalement
    //=============
    createSignalment: (parent, args, ctx, info) => extraRepository.createSignalment(args.name),
    modifySignalment: (parent, { _id, name }, ctx, info) => extraRepository.modifySignalment(_id, name),
    removeSignalment: (parent, args, ctx, info) => extraRepository.removeSignalment(args._id),

    //===========
    // Réaction
    //===========
    createReaction: (parent, args, ctx, info) => extraRepository.createReaction(args.name),
    modifyReaction: (parent, { _id, name }, ctx, info) => extraRepository.modifyReaction(_id, name),
    removeReaction: (parent, args, ctx, info) => extraRepository.removeReaction(args._id),
  },
};
