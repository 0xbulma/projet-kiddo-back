import articleModel from '../models/article.model.mjs';

const POPULATE_ARTICLE = 'author categories categories signalments reactions comments';

export default class ArticleRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return await this.model.find();
  }

  async getById(id) {
    return await this.model.findOne(id);
  }

  async createArticle(articleInput) {
    return await this.model.create(articleInput);
  }

  async modifyArticle(id, input) {
    return await this.model.findOneAndUpdate(id, input, { new: true });
  }

  async removeArticle(id) {
    return await this.model.findOneAndRemove(id);
  }
}
