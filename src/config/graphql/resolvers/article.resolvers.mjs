import ArticleRepository from '../../mongo/repository/ArticleRepository.mjs';

const articleRepository = new ArticleRepository();

export default {
  Query: {
    Articles: () => articleRepository.getArticles(),
    Article: (parent, { id }) => articleRepository.getArticle(id),
  },

  Mutation: {
    createArticle: (parent, { input }, ctx, info) => {
      return articleRepository.createArticle(input);
    },

    updateArticle: (parent, { id, input }, ctx, info) => {
      return articleRepository.updateArticle(id, input);
    },

    deleteArticle: (parent, { id }, ctx, info) => {
      return articleRepository.deleteArticle(id);
    },
  },
};
