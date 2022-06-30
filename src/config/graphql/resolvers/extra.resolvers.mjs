import { EXTRA_TYPES } from '../../mongo/repository/ExtraRepository.mjs';
import ExtraRepository from '../../mongo/repository/ExtraRepository.mjs';

const extraRepository = new ExtraRepository();

export default {
  Query: {
    badges: () => extraRepository.getBadges(),
    badge: (parent, { _id }) => extraRepository.getBadgeById(_id),

    categories: () => extraRepository.getAll(EXTRA_TYPES.CATEGORY),
    category: (parent, { name }) => extraRepository.getById(EXTRA_TYPES.CATEGORY, {name}),

    restrictions: () => extraRepository.getAll(EXTRA_TYPES.RESTRICTION),
    restriction: (parent, { _id }) => extraRepository.getById(EXTRA_TYPES.RESTRICTION, _id),

    signalments: () => extraRepository.getAll(EXTRA_TYPES.SIGNALMENT),
    signalment: (parent, { _id }) => extraRepository.getById(EXTRA_TYPES.SIGNALMENT, _id),

    reactions: () => extraRepository.getAll(EXTRA_TYPES.REACTION),
    reaction: (parent, { _id }) => extraRepository.getById(EXTRA_TYPES.REACTION, _id),
  },

  Mutation: {
    //========
    // Badge
    //========
    createBadge: (parent, { input }) => extraRepository.createBadge(input),
    modifyBadge: (parent, { _id, input }) => extraRepository.modifyBadge(_id, input),
    removeBadge: (parent, args) => extraRepository.removeBadge(args._id),

    //===========
    // Categorie
    //===========
    createCategory: (parent, args) => extraRepository.create(EXTRA_TYPES.CATEGORY, args.name),
    modifyCategory: (parent, { _id, name }) => extraRepository.modify(EXTRA_TYPES.CATEGORY, _id, name),
    removeCategory: (parent, args) => extraRepository.remove(EXTRA_TYPES.CATEGORY, args._id),

    //=============
    // Restriction
    //=============
    createRestriction: (parent, args) => extraRepository.create(EXTRA_TYPES.RESTRICTION, args.name),
    modifyRestriction: (parent, { _id, name }) => extraRepository.modify(EXTRA_TYPES.RESTRICTION, _id, name),
    removeRestriction: (parent, args) => extraRepository.remove(EXTRA_TYPES.RESTRICTION, args._id),

    //=============
    // Signalement
    //=============
    createSignalment: (parent, args) => extraRepository.create(EXTRA_TYPES.SIGNALMENT, args.name),
    modifySignalment: (parent, { _id, name }) => extraRepository.modify(EXTRA_TYPES.SIGNALMENT, _id, name),
    removeSignalment: (parent, args) => extraRepository.remove(EXTRA_TYPES.SIGNALMENT, args._id),

    //===========
    // Réaction
    //===========
    createReaction: (parent, args) => extraRepository.create(EXTRA_TYPES.REACTION, args.name),
    modifyReaction: (parent, { _id, name }) => extraRepository.modify(EXTRA_TYPES.REACTION, _id, name),
    removeReaction: (parent, args) => extraRepository.remove(EXTRA_TYPES.REACTION, args._id),
  },
};
