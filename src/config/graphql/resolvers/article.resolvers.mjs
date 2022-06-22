import ArticleRepository from '../../mongo/repository/ArticleRepository.mjs';

const articleRepository = new ArticleRepository();

export default {
  Query: {
    Articles: () => articleRepository.getAll(),
    Article: (parent, { id }) => articleRepository.getById(id),
  },

  Mutation: {
    createArticle: (parent, { input }, ctx, info) => {
      return articleRepository.createArticle(input);
    },

    modifyArticle: (parent, { id, input }, ctx, info) => {
      return articleRepository.modifyArticle(id, input);
    },

    removeArticle: (parent, { id }, ctx, info) => {
      return articleRepository.removeArticle(id);
    },
  },
};
