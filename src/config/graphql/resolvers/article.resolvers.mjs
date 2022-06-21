import ArticleRepository from '../../mongo/repository/ArticleRepository.mjs';

const articleRepository = new ArticleRepository();

export default {
  Query: {
    Articles: () => 'Articles',
  },
  
  Mutation: {
    createArticle: (parent, { articleInput }, ctx, info) => {
      const createdArticle = articleRepository.createArticle(articleInput);
      return createdArticle;
    }
  },
};
