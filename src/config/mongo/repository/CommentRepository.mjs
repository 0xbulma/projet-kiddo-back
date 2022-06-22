import commentModel from '../models/comment.model.mjs';

export default class CommentRepository {
  //===============================================
  // Récupération des données liées à l'utilisateur
  //===============================================
  async getAll() {
    return await commentModel.find();
  }

  async getById(id) {
    return await commentModel.findById(id);
  }

  //==========================================
  // Création et modification de l'utilisateur
  //==========================================
  async createComment(input) {
    return await commentModel.create(input);
  }

  async modifyComment(id, input) {
    return await commentModel.findByIdAndUpdate(id, input, { new: true });
  }

  async removeComment(id) {
    return await commentModel.findByIdAndRemove(id);
  }
}