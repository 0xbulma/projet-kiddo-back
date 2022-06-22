import CommentRepository from '../../mongo/repository/CommentRepository.mjs';
const commentRepository = new CommentRepository();

export default {
  Query: {
    comments: async (parent, args, context, info) => {
      return await commentRepository.getAll();
    },
    comment: async (parent, { id }, context, info) => {
      return await commentRepository.getById(id);
    },
  },

  Mutation: {
    createComment: async (parent, { id, input }, ctx, info) => {
        return await commentRepository.createComment(id, input);
      },
    modifyComment: (parent, { id, input }, ctx, info) => {
      return await commentRepository.modifyComment(id, input);
      },
    removeComment: (parent, { id }, ctx, info) => {
      return await commentRepository.removeComment(id);
    },
  },
};

