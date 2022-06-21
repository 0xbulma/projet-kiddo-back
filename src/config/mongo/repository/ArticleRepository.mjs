import articleModel from "../models/article.model.mjs";

export default class ArticleRepository {
  constructor() {
    this.model = articleModel;
  }
  
  async createArticle(articleInput) {
    return await this.model.create(articleInput);
  }
  
  async getArticles() {
    return await this.model.find();
  }
  
  async getArticle(id) {
    return await this.model.findById(id);
  }
  
  async updateArticle(id, input) { 
    return await this.model.findByIdAndUpdate(id, input, { new: true });
  }
  
  async deleteArticle(id) {
    return await this.model.findByIdAndDelete(id);
  }
}