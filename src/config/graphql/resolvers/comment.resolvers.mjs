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
    getByTargetId: async (parent, { type, id }, context, info) => {
      const comments = await commentRepository.getByTargetId(type, id);
      return comments;
    },
  },

  Mutation: {
    createComment: async (parent, { input }, ctx, info) => {
      return await commentRepository.createComment(input);
    },
    modifyComment: async (parent, { input }, ctx, info) => {
      return await commentRepository.modifyComment(input._id, input);
    },
    removeComment: async (parent, { id }, ctx, info) => {
      return await commentRepository.removeComment(id);
    },
    addReaction: async (parent, { id, input }) => {
      const comment = await commentRepository.getById(id);
      const reactions = comment.reactions;

      const senderId = input.sender;

      let isAlreadyReacted = false;
      reactions.map((reaction) => {
        if (reaction.sender._id.equals(senderId)) isAlreadyReacted = true;
      });

      if (isAlreadyReacted) {
        return await commentRepository.modifyComment(id, { reactions: reactions.filter((r) => r.sender._id.toString() !== senderId) });
      }

      //Type ID est temporaire, represente l'id du like
      reactions.push({ type: '62bef2b93fdb4c2bc213dac0', sender: senderId });
      return await commentRepository.modifyComment(id, { reactions: reactions });
    },
  },
};
